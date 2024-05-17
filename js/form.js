// Функция для отправки данных формы в телеграм-бот
const sendFormDataToTelegram = async (formData) => {
    try {
        // URL для отправки запроса в телеграм-бот
        const telegramApiUrl = `https://api.telegram.org/6600099198:AAGyTwqp7-CMqscwdtXoQC_FvMIXr0TfEP8/sendMessage`;
        
        // Телеграм-бот ожидает данные в формате JSON
        const message = `
            <b>Имя:</b> ${formData.name}
            <b>Фамилия:</b> ${formData.surname || 'Не указана'}
            <b>Номер телефона:</b> ${formData.phone}
            <b>Почта:</b> ${formData.email}
            <b>Сообщение:</b> ${formData.message}
        `;
        
        // Параметры для запроса fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '-4044044095', // Замените на свой chat_id
                text: message,
                parse_mode: 'HTML',
            }),
        };

        // Отправка запроса
        const response = await fetch(telegramApiUrl, requestOptions);
        const responseData = await response.json();

        // Проверка статуса ответа
        if (response.ok) {
            // Возвращаем данные
            return responseData;
        } else {
            // Если запрос не успешен, генерируем ошибку
            throw new Error(`Ошибка: ${responseData.description}`);
        }
    } catch (error) {
        console.error('Ошибка при отправке данных в телеграм:', error.message);
        throw error;
    }
};

// Обработчик события отправки формы
document.querySelector('.contact-page__form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем данные из формы
    const formData = {
        name: event.target.elements['name'].value,
        surname: event.target.elements['surname'].value,
        phone: event.target.elements['phone'].value,
        email: event.target.elements['email'].value,
        message: event.target.elements['message'].value,
    };

    try {
        // Отправляем данные в телеграм
        const response = await sendFormDataToTelegram(formData);
        console.log('Ответ от телеграм:', response);
        alert('Данные успешно отправлены!');
        // Очистка формы после успешной отправки
        event.target.reset();
    } catch (error) {
        alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
    }
});
