import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';

function PreviousOrder() {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order', {
                    headers: {
                        'Authorization': `Bearer ${currentUser?.token}`
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (currentUser?.token) {
            fetchOrders();
        }
    }, [currentUser]);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <h1 className="text-3xl font-bold mb-8">Previous Orders</h1>
            
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No previous orders found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border rounded-lg overflow-hidden">
                            <div 
                                className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleOrderDetails(order._id)}
                            >
                                <div className="grid grid-cols-4 gap-4 flex-1">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="font-medium">{order._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className="font-medium capitalize">{order.status}</p>
                                    </div>
                                </div>
                                {expandedOrder === order._id ? 
                                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                }
                            </div>
                            
                            {expandedOrder === order._id && (
                                <div className="p-4 border-t">
                                    <h3 className="font-medium mb-4">Order Details</h3>
                                    <div className="space-y-4">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                                <div className="flex items-center space-x-4">
                                                    <img 
                                                        src={item.product.image} 
                                                        alt={item.product.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.product.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex justify-between">
                                            <p className="font-medium">Shipping Address:</p>
                                            <p className="text-gray-600">{order.shippingAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PreviousOrder;