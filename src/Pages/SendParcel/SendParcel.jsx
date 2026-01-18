import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTrackingLogger from "../../Hooks/useTrackingLogger";


export default function SendParcel() {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const serviceCenters = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { logTracking } = useTrackingLogger();

    const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

    const getDistrictByRegion = (region) =>
        serviceCenters
            .filter((w) => w.region === region)
            .map((w) => w.district);

    const parcelType = watch("parcelType");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    // ===================== SUBMIT HANDLER =====================
    const onSubmit = (data) => {
        const isWithinDistrict =
            data.senderDistrict === data.receiverDistrict;

        let basePrice = 0;
        let extraWeightCost = 0;
        let outsideDistrictCharge = 0;

        // ---------- Pricing Policy ----------
        if (data.parcelType === "document") {
            basePrice = isWithinDistrict ? 60 : 80;
        }

        if (data.parcelType === "non-document") {
            const weight = Number(data.weight || 0);

            basePrice = isWithinDistrict ? 110 : 150;

            if (weight > 3) {
                const extraKg = Math.ceil(weight - 3);
                extraWeightCost = extraKg * 40;

                if (!isWithinDistrict) {
                    outsideDistrictCharge = 40;
                }
            }
        }

        const totalCost =
            basePrice + extraWeightCost + outsideDistrictCharge;

        // ---------- SweetAlert Review ----------
        Swal.fire({
            title: "Review & Confirm Pricing",
            icon: "info",
            html: `
                <div style="text-align:left; font-size:15px;">
                    <p><b>Parcel Type:</b> ${data.parcelType}</p>
                    <p><b>Route:</b> ${data.senderDistrict} → ${data.receiverDistrict}</p>
                    <hr/>

                    <p>Base Price: <b>৳${basePrice}</b></p>
                    ${extraWeightCost
                    ? `<p>Extra Weight Charge: <b>৳${extraWeightCost}</b></p>`
                    : ""
                }
                    ${outsideDistrictCharge
                    ? `<p>Outside District Charge: <b>৳${outsideDistrictCharge}</b></p>`
                    : ""
                }

                    <hr/>
                    <p style="
                        font-size:20px;
                        font-weight:bold;
                        color:#16a34a;
                    ">
                        Total Payable: ৳${totalCost}
                    </p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Go Back & Edit",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#2563eb",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const trackingId = `TRK-${Date.now()}`;
                const parcelData = {
                    ...data,
                    trackingId: trackingId,
                    createdByEmail: user?.email,

                    parcelType: data.parcelType,
                    title: data.title,
                    weight: data.weight || null,
                    pricing: {
                        basePrice,
                        extraWeightCost,
                        outsideDistrictCharge,
                        totalCost,
                    },

                    paymentStatus: "unpaid",
                    status: "pending",
                    delivery_status: 'not_collected',
                    createdAt: new Date().toISOString(),
                };


                axiosSecure.post('/parcels', parcelData)
                    .then(async (res) => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Parcel Created",
                                text: "Redirecting to payment...",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                        await logTracking({
                            trackingId: parcelData.trackingId,
                            status: "parcel_created",
                            details: `Created by ${user.displayName}`,
                            updated_by: user.email,
                        })
                        navigate('/dashboard/myParcels')
                    })

            }
        });
    };

    // ===================== UI =====================
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold">Send a Parcel</h1>
                <p className="text-gray-500">
                    Door to Door delivery – pickup & delivery locations required
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Parcel Info</h2>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="label">Parcel Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="document"
                                            className="radio radio-primary"
                                            {...register("parcelType", { required: true })}
                                        />
                                        Document
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="non-document"
                                            className="radio radio-primary"
                                            {...register("parcelType", { required: true })}
                                        />
                                        Non-Document
                                    </label>
                                </div>
                                {errors.parcelType && (
                                    <p className="text-red-500 text-sm">Required</p>
                                )}
                            </div>

                            <input
                                className="input input-bordered w-full"
                                placeholder="Parcel Title"
                                {...register("title", { required: true })}
                            />

                            <input
                                type="number"
                                step="0.1"
                                disabled={parcelType !== "non-document"}
                                className="input input-bordered w-full"
                                placeholder="Weight (kg)"
                                {...register("weight")}
                            />
                        </div>
                    </div>
                </div>

                {/* Sender & Receiver */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Sender */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Sender Information</h2>

                            <input className="input input-bordered w-full" placeholder="Sender Name" {...register("senderName", { required: true })} />
                            <input className="input input-bordered w-full" placeholder="Sender Contact" {...register("senderContact", { required: true })} />

                            <select className="select select-bordered w-full" {...register("senderRegion", { required: true })}>
                                <option value="">Select Region</option>
                                {uniqueRegions.map((r) => (
                                    <option key={r}>{r}</option>
                                ))}
                            </select>

                            <select className="select select-bordered w-full" {...register("senderDistrict", { required: true })}>
                                <option value="">Select District</option>
                                {getDistrictByRegion(senderRegion)?.map((d) => (
                                    <option key={d}>{d}</option>
                                ))}
                            </select>

                            <textarea className="textarea textarea-bordered w-full" placeholder="Pickup Address" {...register("senderAddress", { required: true })} />
                            <textarea className="textarea textarea-bordered w-full" placeholder="Pickup Instruction" {...register("pickupInstruction")} />
                        </div>
                    </div>

                    {/* Receiver */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Receiver Information</h2>

                            <input className="input input-bordered w-full" placeholder="Receiver Name" {...register("receiverName", { required: true })} />
                            <input className="input input-bordered w-full" placeholder="Receiver Contact" {...register("receiverContact", { required: true })} />

                            <select className="select select-bordered w-full" {...register("receiverRegion", { required: true })}>
                                <option value="">Select Region</option>
                                {uniqueRegions.map((r) => (
                                    <option key={r}>{r}</option>
                                ))}
                            </select>

                            <select className="select select-bordered w-full" {...register("receiverDistrict", { required: true })}>
                                <option value="">Select District</option>
                                {getDistrictByRegion(receiverRegion)?.map((d) => (
                                    <option key={d}>{d}</option>
                                ))}
                            </select>

                            <textarea className="textarea textarea-bordered w-full" placeholder="Delivery Address" {...register("receiverAddress", { required: true })} />
                            <textarea className="textarea textarea-bordered w-full" placeholder="Delivery Instruction" {...register("deliveryInstruction")} />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary px-10 text-black font-bold">
                        Review & Submit Parcel
                    </button>
                </div>
            </form>
        </div>
    );
}
