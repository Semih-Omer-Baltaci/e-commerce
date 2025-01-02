import { useState, useEffect } from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OrderAddress() {
    const [selectedAddress] = useState('');
    const [sameAsBilling, setSameAsBilling] = useState(true);
    const cartState = useSelector((/** @type {{ cart: any; }} */ state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        // Debug için cart state'ini kontrol et
        console.log('Cart State:', cartState);
    }, [cartState]);

    // Cart kontrolü
    if (!cartState?.cart || cartState.cart.length === 0) {
        console.log('Cart veya items bulunamadı');
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-lg mb-4">Sepetiniz boş görünüyor.</p>
                    <button 
                        onClick={() => navigate('/cart')} 
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                        Sepete Git
                    </button>
                </div>
            </div>
        );
    }

    // Toplam tutarı hesapla
    const subtotal = cartState.cart.reduce((/** @type {number} */ total, /** @type {{ product: { price: number; }; count: number; }} */ item) => {
        const price = item.product?.price || 0;
        const count = item.count || 0;
        return total + (price * count);
    }, 0);
    const shippingCost = 29.99;
    const freeShippingThreshold = 150;
    const finalShippingCost = subtotal >= freeShippingThreshold ? 0 : shippingCost;
    const total = subtotal + finalShippingCost;

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Ana Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sol Taraf - Adres ve Ödeme Bilgileri */}
                <div className="lg:col-span-2">
                    {/* Adres Bilgileri Bölümü */}
                    <div className="bg-white rounded-lg mb-6">
                        {/* Başlık */}
                        <div className="flex items-center p-4 border-b">
                            <div className="flex items-center">
                                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    1
                                </span>
                                <h2 className="text-xl text-orange-500 font-medium">Adres Bilgileri</h2>
                            </div>
                        </div>

                        {/* Ev Adresi */}
                        <div className="p-4">
                            <div className="flex items-center mb-4">
                                <span className="mr-2">Ev</span>
                                <div className="flex-1">
                                    <div className="bg-[#8B0000] text-white p-2 rounded">
                                        06000 - Ankara/Etimesgut
                                    </div>
                                </div>
                            </div>

                            {/* Kurumsal Fatura Uyarısı */}
                            <div className="bg-gray-50 p-4 rounded mb-6">
                                <div className="flex items-start">
                                    <span className="text-orange-500 mr-2">ℹ</span>
                                    <p className="text-sm text-gray-600">
                                        Kurumsal faturalı alışveriş yapmak için &quot;Faturamı Aynı Adrese Gönder&quot; tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
                                    </p>
                                </div>
                            </div>

                            {/* Teslimat Adresi */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium">Teslimat Adresi</h3>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={sameAsBilling}
                                            onChange={(e) => setSameAsBilling(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Faturamı Aynı Adrese Gönder</span>
                                        <button className="ml-4 text-gray-500 text-sm hover:text-gray-700">
                                            Düzenle
                                        </button>
                                    </div>
                                </div>

                                {/* Adres Seçenekleri */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Yeni Adres Ekle */}
                                    <div className="border border-gray-300 rounded p-4 flex items-center justify-center cursor-pointer hover:border-orange-500">
                                        <div className="text-center">
                                            <span className="text-orange-500 text-2xl">+</span>
                                            <span className="ml-2 text-gray-600">Yeni Adres Ekle</span>
                                        </div>
                                    </div>

                                    {/* Mevcut Adresler */}
                                    <div className={`border ${selectedAddress === 'home' ? 'border-orange-500' : 'border-gray-200'} rounded p-4`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">Ev</span>
                                                    <span className="ml-4 text-xs text-gray-500">(530) *** ** 12</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600 bg-[#8B0000] p-2 rounded">
                                                    06000 - Ankara/Etimesgut
                                                </p>
                                            </div>
                                            <button className="text-gray-500 text-sm hover:text-gray-700">
                                                Düzenle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ödeme Seçenekleri Bölümü */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center mb-4">
                            <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                2
                            </span>
                            <h2 className="text-xl text-orange-500 font-medium">Ödeme Seçenekleri</h2>
                        </div>
                        <p className="text-gray-600">
                            Banka/Kredi Kartı <span className="text-gray-400">veya</span> Alışveriş Kredisi <span className="text-gray-400">ile ödemenizi güvenle yapabilirsiniz.</span>
                        </p>
                    </div>
                </div>

                {/* Sağ Taraf - Sipariş Özeti */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg p-4">
                        <h2 className="text-xl font-medium mb-4">Sipariş Özeti</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Ürünün Toplamı</span>
                                <span>{subtotal.toFixed(2)} TL</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Kargo Toplam</span>
                                <span>{shippingCost.toFixed(2)} TL</span>
                            </div>
                            {subtotal >= freeShippingThreshold && (
                                <div className="flex justify-between text-gray-600">
                                    <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                                    <span className="text-red-500">-{shippingCost.toFixed(2)} TL</span>
                                </div>
                            )}
                            <div className="pt-3 border-t">
                                <div className="flex justify-between font-medium">
                                    <span>Toplam</span>
                                    <span className="text-orange-500">{total.toFixed(2)} TL</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <button className="w-full bg-orange-500 text-white py-3 px-4 rounded font-medium hover:bg-orange-600 transition-colors">
                                Kaydet ve Devam Et
                            </button>
                            <div className="text-sm text-gray-600">
                                <label className="flex items-start">
                                    <input type="checkbox" className="mr-2 mt-1" />
                                    <span>
                                        <a href="#" className="text-gray-600 hover:text-gray-800">Ön Bilgilendirme Koşulları</a>
                                        &apos;nı ve 
                                        <a href="#" className="text-gray-600 hover:text-gray-800"> Mesafeli Satış Sözleşmesi</a>
                                        &apos;ni okudum, onaylıyorum.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderAddress;
