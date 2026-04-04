import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="max-w-[900px] mx-auto px-6 pb-24 pt-32 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="text-gray-500 text-xs uppercase tracking-[0.2em] hover:text-white transition-colors mb-8 inline-block">← На главную</Link>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">Политика конфиденциальности</h1>
        <p className="text-gray-500 text-sm mb-12">Последнее обновление: 04 апреля 2026 г.</p>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">1. Общие положения</h2>
            <p>Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей интернет-магазина Digital Tech (далее — «Сайт», «Мы», «Администрация»), расположенного по адресу в сети Интернет.</p>
            <p className="mt-2">Используя Сайт, вы подтверждаете своё согласие с настоящей Политикой конфиденциальности. В случае несогласия с условиями Политики, пожалуйста, воздержитесь от использования Сайта.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">2. Какие данные мы собираем</h2>
            <p>В процессе использования Сайта мы можем собирать следующие категории персональных данных:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Имя и фамилия (при регистрации)</li>
              <li>Адрес электронной почты</li>
              <li>Пароль в зашифрованном виде (хеширование bcrypt)</li>
              <li>IP-адрес и данные User-Agent браузера</li>
              <li>Данные о посещённых страницах и действиях на Сайте</li>
              <li>Файлы cookie и аналогичные технологии</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">3. Цели обработки данных</h2>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Регистрация и аутентификация пользователей на Сайте</li>
              <li>Обработка заказов и предоставление товаров/услуг</li>
              <li>Информирование о новостях, акциях и специальных предложениях (при наличии согласия)</li>
              <li>Улучшение качества обслуживания и функциональности Сайта</li>
              <li>Аналитика посещаемости и поведения пользователей</li>
              <li>Обеспечение безопасности и предотвращение мошенничества</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">4. Хранение и защита данных</h2>
            <p>Мы применяем современные организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Шифрование паролей с использованием алгоритма bcrypt</li>
              <li>Использование технологии JWT (JSON Web Token) для безопасной аутентификации</li>
              <li>Ограничение доступа к персональным данным со стороны сотрудников</li>
              <li>Регулярное обновление программного обеспечения сервера</li>
            </ul>
            <p className="mt-2">Персональные данные хранятся в течение всего срока использования Сайта и удаляются по запросу пользователя.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">5. Передача данных третьим лицам</h2>
            <p>Администрация не передаёт персональные данные третьим лицам, за исключением следующих случаев:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>С явного согласия пользователя</li>
              <li>По требованию законодательства Российской Федерации</li>
              <li>Для защиты прав и законных интересов Администрации</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">6. Файлы cookie</h2>
            <p>Сайт использует файлы cookie для обеспечения корректной работы, персонализации контента и анализа трафика. Вы можете отключить использование cookie в настройках вашего браузера, однако это может повлиять на функциональность Сайта.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">7. Права пользователя</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Запросить информацию о хранящихся персональных данных</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Потребовать удаления персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
            <p className="mt-2">Для реализации указанных прав обратитесь по адресу: <a href="mailto:opusgang@gmail.com" className="text-blue-500 hover:text-blue-400 transition-colors">opusgang@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">8. Изменение Политики</h2>
            <p>Администрация оставляет за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия Политики всегда доступна на данной странице. Продолжение использования Сайта после внесения изменений означает ваше согласие с обновлённой Политикой.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-3">9. Контактная информация</h2>
            <p>По вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Email: <a href="mailto:opusgang@gmail.com" className="text-blue-500 hover:text-blue-400 transition-colors">opusgang@gmail.com</a></li>
              <li>ВКонтакте: <a href="https://vk.com/id501932963" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">Связаться в ЛС</a></li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
