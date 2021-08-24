import { FunctionalComponent, h } from 'preact';
import style from './style.css';
import Videoplayer from '../../components/videoplayer'

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <Videoplayer/>
        </div>
    );
};

export default Home;
