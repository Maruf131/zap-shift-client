import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const [error, setError] = useState('')


    const { isPending, data: parcelInfo } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })
    if (isPending) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    const amount = parcelInfo.pricing.totalCost;

    const amountInCent = amount * 100;
    console.log(amountInCent);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // step-1: Validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setError(error.message)

        }
        else {
            setError('')
            console.log('Paymenst maythod', paymentMethod);
            //Step-2: create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCent,
                parcelId
            })

            const clientSecret = res.data.clientSecret;
            // Step-3: Confirm payment 
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email

                    }
                }
            })

            if (result.error) {
                setError(result.error.message);

            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('payment succeeded');
                    const transactionId = result.paymentIntent.id;
                    //step-4: mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    const paymentRes = await axiosSecure.post('/payments', paymentData);

                    if (paymentRes.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successfully',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId} </code>`,
                            confirmButtonText: 'Go to my parcels'
                        })
                        navigate('/dashboard/myParcels')
                    }
                }
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-10">
                <CardElement className='p-2 border rounded-b-4xl'>

                </CardElement>
                <button className='btn btn-primary w-full text-black font-extrabold' type='submit' disabled={!stripe}>
                    Pay ${amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;