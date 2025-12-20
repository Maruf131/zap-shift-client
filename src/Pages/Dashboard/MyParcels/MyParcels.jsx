import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    const onView = (parcel) => {
        console.log("View parcel:", parcel);
    };

    const onPay = (parcel) => {
        console.log("Pay for parcel:", parcel);
    };

    const handleDeleteParcel = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626", // red
            cancelButtonColor: "#2563eb",  // blue
            reverseButtons: true,
        });
        if (confirm.isConfirmed) {
            try {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: "Parcel has been deleted successfully.",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Deletion Failed",
                    text: error.message || "Something went wrong",
                });
            }
        };
        console.log(parcels);
    }



    return (

        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* Table Head */}
                <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {parcels?.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>

                            <td>
                                <span>
                                    {parcel.title}
                                </span>
                            </td>

                            {/* Parcel Type */}
                            <td>
                                <span className="badge badge-outline">
                                    {parcel.parcelType === "document"
                                        ? "Document"
                                        : "Non-Document"}
                                </span>
                            </td>

                            {/* Created Date */}
                            <td>
                                {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                            </td>

                            {/* total cost  */}
                            <td>
                                <span>
                                    {parcel.pricing.totalCost} ৳
                                </span>
                            </td>

                            {/* Payment Status */}
                            <td>
                                <span
                                    className={`badge ${parcel.paymentStatus === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                    {parcel.paymentStatus}
                                </span>
                            </td>

                            {/* Parcel Status */}
                            <td>
                                <span className="badge badge-info">
                                    {parcel.status}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="text-center space-x-2">
                                <button
                                    onClick={() => onView(parcel)}
                                    className="btn btn-xs btn-info"
                                >
                                    View
                                </button>

                                {parcel.paymentStatus === "unpaid" && (
                                    <button
                                        onClick={() => onPay(parcel)}
                                        className="btn btn-xs btn-success"
                                    >
                                        Pay
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDeleteParcel(parcel._id)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {/* Empty State */}
                    {parcels?.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-10 text-gray-400">
                                No parcels found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
