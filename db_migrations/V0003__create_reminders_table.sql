-- Создание таблицы для напоминаний пользователя
CREATE TABLE IF NOT EXISTS reminders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reminder_time TIME NOT NULL,
    days_of_week INTEGER[] NOT NULL DEFAULT ARRAY[1,2,3,4,5,6,7],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_active ON reminders(is_active);

COMMENT ON TABLE reminders IS 'Таблица с напоминаниями для пользователей Telegram бота';
COMMENT ON COLUMN reminders.user_id IS 'ID пользователя в Telegram';
COMMENT ON COLUMN reminders.title IS 'Название напоминания (например: Попей воды)';
COMMENT ON COLUMN reminders.description IS 'Описание напоминания';
COMMENT ON COLUMN reminders.reminder_time IS 'Время напоминания в формате HH:MM';
COMMENT ON COLUMN reminders.days_of_week IS 'Дни недели (1=Пн, 7=Вс), массив чисел от 1 до 7';
COMMENT ON COLUMN reminders.is_active IS 'Активно ли напоминание';