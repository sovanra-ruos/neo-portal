import DashboardLayout from "@/component/dashboard/dashboard-layout";


export default function DashboardPage() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Products</h2>
                    <p className="text-3xl font-bold">120</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Categories</h2>
                    <p className="text-3xl font-bold">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                    <p className="text-3xl font-bold">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
                    <p className="text-3xl font-bold">$45,678</p>
                </div>
            </div>
        </DashboardLayout>
    )
}

