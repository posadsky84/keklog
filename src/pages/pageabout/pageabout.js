/* eslint-disable max-len */
import './pageabout.css';
import nomadPic from '../../assets/digital_nomad.jpg';

const PageAbout = () => (
  <div className="page-about">

    <div className="nomad-pic-wrapper">
      <img alt="Цифровой кочевник" className="nomad-pic" src={nomadPic} />
      <p className="nomad-pic-label">Село Кош-Кёл, Иссык-Куль, Кыргызстан. Начало октября 2022</p>
    </div>
    <p>
      Меня зовут Алексей Посадский, я — профессиональный программист 1С (+SQL, Powerbuilder). В апреле 2022 года я решил переквалифицироваться во фронтенд-разработчика и с тех пор учусь. React изучаю с помощью онлайн-курса «Реакт. Путь самурая», Javascript — по учебнику learn.javascript.com. Факультативно разрабатываю бэк на связке NodeJS+PostgreSQL — в тех объемах, которые требуются для моих пет-проектов.
    </p>

    <p>
      Этот проект начат 20 октября 2022 г. в условно-вынужденном путешествии в Кыргызстан. Мне всегда не хватало собственного трекера задач с гибкими настройками и возможностью «оценки» дня — планирую сделать его именно таким.
    </p>

    <p>
      Сейчас мой следующий шаг — найти работу стажера/junior в аккредитованной организации, много работать и решать реальные производственные задачи, получать код-ревью профессиональных разработчиков и быстро набираться опыта. Цель, которую ставлю себе — выйти на уровень middle за год. Параллельно планирую пройти более углубленное обучение HTML+CSS.
      С финансовой и житейской точки зрения отношусь к смене карьерного направления как к долгосрочной инвестиции, готов в моменте терять в деньгах и жертвовать свободным временем. Уверен — я на правильном пути)
    </p>

  </div>
);

export default PageAbout;
