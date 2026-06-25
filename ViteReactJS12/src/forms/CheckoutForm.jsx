import { useActionState, useEffect } from 'react';
import './css/style.css'; // Перенесённые стили

function CheckoutForm() {
    const [state, formAction, isPending] = useActionState(
        async (_prevState, formData) => {
            try {
                // Извлекаем данные из FormData по атрибутам "name" инпутов
                const orderData = {
                    name: formData.get('userName'),
                    email: formData.get('userEmail'),
                    phone: formData.get('userPhone'),
                    address: formData.get('userAddress'),
                    delivery: formData.get('deliveryMethod'),
                    agree: formData.get('agreeTerms') === 'on' // checkbox возвращает 'on', если выбран
                };

                console.log('Начало отправки заказа...', orderData);

                // Имитируем запрос к серверу (задержка 1.5 секунды)
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Условная проверка (валидация на бэкенде)
                if (!orderData.name || orderData.name.trim().length < 2) {
                    throw new Error("Ім'я надто коротке!");
                }

                // Имитируем успешный ответ от API (например, возвращаем ID заказа)
                const mockResponse = {
                    orderId: Math.floor(Math.random() * 90000) + 10000,
                    status: "success",
                    timestamp: new Date().toISOString()
                };

                return { success: true, data: mockResponse };
            } catch (error) {
                console.error('Помилка при оформленні:', error);
                return { success: false, error: error.message };
            }
        },
        null // Начальное состояние (state = null)
    );

    // Следим за изменением состояния формы
    useEffect(() => {
        if (state) {
            console.log('Текущий стейт формы изменён:', state);
        }
    }, [state]);

    return (
        <div className="container">
            <h1 style={{ marginBottom: '30px', color: '#f5f5f5' }}>Оформлення замовлення</h1>

            <div className="checkout-container">
                {/* ФОРМА */}
                <form action={formAction} className="checkout-form">
                    <h2>Ваші дані</h2>

                    <div className="form-group">
                        <label htmlFor="userName">Повне ім'я *</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName" // Важно для formData.get()
                            className="form-control"
                            placeholder="Вкажіть ваше ім'я"
                            disabled={isPending}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="userEmail">Електронна адреса *</label>
                        <input
                            type="email"
                            id="userEmail"
                            name="userEmail" // Важно для formData.get()
                            className="form-control"
                            placeholder="example@mail.com"
                            disabled={isPending}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="userPhone">Номер телефону *</label>
                        <input
                            type="tel"
                            id="userPhone"
                            name="userPhone" // Важно для formData.get()
                            className="form-control"
                            placeholder="+380 96 000 00 00"
                            disabled={isPending}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="userAddress">Адреса доставки *</label>
                        <textarea
                            id="userAddress"
                            name="userAddress" // Важно для formData.get()
                            className="form-control"
                            placeholder="Вкажіть адресу"
                            rows="3"
                            disabled={isPending}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="deliveryMethod">Спосіб доставки *</label>
                        <select
                            id="deliveryMethod"
                            name="deliveryMethod" // Важно для formData.get()
                            className="form-control"
                            disabled={isPending}
                            required
                        >
                            <option value="">-- Виберіть --</option>
                            <option value="nova-poshta">Нова Пошта</option>
                            <option value="ukrposhta">Укрпошта</option>
                            <option value="pickup">Самовивіз</option>
                        </select>
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms" // Важно для formData.get()
                            disabled={isPending}
                            required
                        />
                        <label htmlFor="agreeTerms" style={{ marginBottom: 0 }}>
                            Я погоджуюсь з умовами використання
                        </label>
                    </div>

                    <button type="submit" className="btn-primary" disabled={isPending}>
                        {isPending ? 'Обробка замовлення...' : 'Оформити замовлення'}
                    </button>

                    <button
                        type="button"
                        className="btn-secondary"
                        disabled={isPending}
                        onClick={() => console.log('Перехід до кошика')}
                    >
                        Повернутися до кошика
                    </button>
                </form>

                {/* РЕЗЮМЕ ЗАМОВЛЕННЯ / СТАТУС */}
                <aside>
                    <div id="orderSummary">
                        <h3>Статус операції</h3>

                        {!state && (
                            <p style={{ color: '#666' }}>Заповніть форму та натисніть кнопку відправки для обробки.</p>
                        )}

                        {state && (
                            <div className={`notification-box ${state.success ? 'success' : 'error'}`}>
                                <p style={{ fontWeight: 'bold' }}>
                                    {state.success ? '🎉 Замовлення успішно створено!' : '❌ Помилка оформлення:'}
                                </p>
                                {state.success ? (
                                    <pre style={{ marginTop: '10px', background: '#333', color: '#89ddff', padding: '10px', borderRadius: '5px' }}>
                                        {JSON.stringify(state.data, null, 2)}
                                    </pre>
                                ) : (
                                    <p style={{ color: '#721c24' }}>{state.error}</p>
                                )}
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default CheckoutForm;