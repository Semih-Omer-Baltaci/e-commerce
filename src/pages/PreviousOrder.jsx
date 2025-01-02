import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-toastify';

function PreviousOrder() {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser, token } = useSelector((state) => state.user);

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const authToken = token || localStorage.getItem('token');
            if (!authToken) {
                throw new Error('No authentication token available');
            }
            
            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            
            const response = await api.get('/order');
            console.log('API Response:', response.data); // Debug için eklendi
            
            if (!response.data) {
                throw new Error('No data received from server');
            }

            let orderData = null;
            
            if (Array.isArray(response.data)) {
                orderData = response.data;
            } else if (response.data.data && Array.isArray(response.data.data)) {
                orderData = response.data.data;
            } else if (response.data.orders && Array.isArray(response.data.orders)) {
                orderData = response.data.orders;
            } else {
                throw new Error('Unexpected data format received');
            }
            // {
            //     "id": 14,
            //     "user_id": 25,
            //     "address_id": 13,
            //     "order_date": "2025-01-02T11:50:57.789Z",
            //     "card_no": 4444444444444444,
            //     "card_name": "asda",
            //     "card_expire_month": 2,
            //     "card_expire_year": 2222,
            //     "price": 205.48000000000002,
            //     "products": [
            //         {
            //             "id": 3,
            //             "name": "Beyaz %100 Pamuk",
            //             "description": "Beyaz %100 Pamuk Regular/Normal Kalıp Basic V Yaka Uzun Kollu Örme T-Shirt TWOAW21TS0099",
            //             "price": 140.99,
            //             "count": 1,
            //             "images": [
            //                 {
            //                     "url": "https://cdn.dsmcdn.com/ty155/product/media/images/20210806/13/116221695/81629339/1/1_org_zoom.jpg",
            //                     "index": 0
            //                 }
            //             ]
            //         },
            //         {
            //             "id": 4,
            //             "name": "Çocuk Kırmızı Türk",
            //             "description": "Çocuk Kırmızı Türk Bayraklı T-shirt",
            //             "price": 64.49,
            //             "count": 1,
            //             "images": [
            //                 {
            //                     "url": "https://cdn.dsmcdn.com/ty563/product/media/images/20221013/13/192656071/81629346/2/2_org_zoom.jpg",
            //                     "index": 0
            //                 }
            //             ]
            //         }
            //     ]
            // }
            // Veri yapısını düzenle
            const formattedOrders = orderData.map(order => ({
                _id: order._id || order.id,
                createdAt: order.createdAt || new Date().toISOString(),
                totalAmount: order.totalAmount || order.total || 0,
                status: order.status || 'pending',
                items: (order.products || []).map(item => ({
                    _id: item._id || item.id,
                    product: {
                        name: item.product?.name || item.name || 'Unknown Product',
                        image: item.product?.images?.[0]?.url || item.images?.[0]?.url || item.image || '',
                        price: item.product?.price || item.price || 0
                    },
                    quantity: item.quantity || 1,
                    price: item.price || item.product?.price || 0
                }))
            }));

            setOrders(formattedOrders);
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            });
            setError(error.response?.data?.message || error.message || 'Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const handleResetOrders = async () => {
        if (!window.confirm('Are you sure you want to clear your order history? This action cannot be undone.')) {
            return;
        }

        try {
            setIsLoading(true);
            const authToken = token || localStorage.getItem('token');
            if (!authToken) {
                throw new Error('No authentication token available');
            }
            
            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            
            // Instead of trying to delete orders, we'll mark them as cancelled
            const updatePromises = orders.map(order => 
                api.put(`/order/${order._id || order.id}`, {
                    status: 'cancelled'
                })
            );
            
            await Promise.all(updatePromises);
            toast.success('Orders have been cancelled successfully');
            await fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error('Error resetting orders:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to reset orders');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser?.token || localStorage.getItem('token')) {
            fetchOrders();
        } else {
            setIsLoading(false);
            setError('Please log in to view your orders');
        }
    }, [currentUser?.token, fetchOrders]);

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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Order History</h1>
                {orders.length > 0 && (
                    <button
                        onClick={handleResetOrders}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Order History'}
                    </button>
                )}
            </div>
            
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No previous orders found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id || order.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div 
                                className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleOrderDetails(order._id || order.id)}
                            >
                                <div className="grid grid-cols-4 gap-4 flex-1">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="font-medium">{order._id || order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="font-medium">${order.totalAmount?.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className="font-medium capitalize">{order.status}</p>
                                    </div>
                                </div>
                                {expandedOrder === (order._id || order.id) ? 
                                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                }
                            </div>
                            
                            {expandedOrder === (order._id || order.id) && (
                                <div className="p-4 border-t bg-gray-50">
                                    <h3 className="font-medium mb-4">Order Details</h3>
                                    <div className="space-y-4">
                                        {order.items?.map((item, index) => (
                                            <div key={`${order._id || order.id}-item-${item._id || item.id || index}`} className="flex items-center justify-between py-2 border-b last:border-b-0 bg-white p-4 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <img 
                                                        src={item.product?.image} 
                                                        alt={item.product?.name || 'Product image'}
                                                        className="w-16 h-16 object-cover rounded"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.product?.name || item.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-medium">
                                                    ${((item.price || item.product?.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Shipping Address:</span>
                                            <p className="text-gray-600">{order.card_name} asdsada</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-medium">Payment Method:</span>
                                            <p className="text-gray-600">{order.card_no}</p>
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