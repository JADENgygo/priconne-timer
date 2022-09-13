import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const Home: NextPage = () => {
  const [voice, setVoice] = useState<"peko" | "kokkoro" | "kyaru">("peko");
  const [timer, setTimer] = useState({hour: 0, minute: 0, second: 0});
  const [counter, setCounter] = useState(0);
  const [id, setId] = useState(-1);
  const [stopped, setStopped] = useState(false);
  const [alerted, setAlerted] = useState(false);
  const ref = useRef<() => void>(() => {});

  useEffect(() => {
    const peko = document.getElementById('pekoAudio') as HTMLAudioElement;
    peko.volume = 1;
    const kokkoro = document.getElementById('kokkoroAudio') as HTMLAudioElement;
    kokkoro.volume = 1;
    const kyaru = document.getElementById('kyaruAudio') as HTMLAudioElement;
    kyaru.volume = 1;
  }, []);

  const f = () => {
    if (counter - 1 === 0) {
      window.clearInterval(id);
      const audio = document.getElementById(voice + 'Audio') as HTMLAudioElement;
      audio.play();
      setId(-1);
      setAlerted(true);
    }
    setCounter(counter - 1);
  };

  const start = () => {
    if (id !== -1) {
      window.clearInterval(id);
    }
    const peko = document.getElementById('pekoAudio') as HTMLAudioElement;
    peko.pause();
    peko.currentTime = 0;
    const kokkoro = document.getElementById('kokkoroAudio') as HTMLAudioElement;
    kokkoro.pause();
    kokkoro.currentTime = 0;
    const kyaru = document.getElementById('kyaruAudio') as HTMLAudioElement;
    kyaru.pause();
    kyaru.currentTime = 0;

    const buf = window.setInterval(() => ref.current(), 1000);
    setId(buf);
    setCounter(timer.hour * 3600 + timer.minute * 60 + timer.second);
    setStopped(false);
    setAlerted(false);
  };

  const stop = () => {
    window.clearInterval(id);
    setId(-1);
    setStopped(true);
  };

  const resume = () => {
    const buf = window.setInterval(() => ref.current(), 1000);
    setId(buf);
    setStopped(false);
  };

  const mute = () => {
    const peko = document.getElementById('pekoAudio') as HTMLAudioElement;
    peko.pause();
    peko.currentTime = 0;
    const kokkoro = document.getElementById('kokkoroAudio') as HTMLAudioElement;
    kokkoro.pause();
    kokkoro.currentTime = 0;
    const kyaru = document.getElementById('kyaruAudio') as HTMLAudioElement;
    kyaru.pause();
    kyaru.currentTime = 0;
    setAlerted(false);
  };

  useEffect(() => {
    ref.current = f;
  }, [f]);

  return (
    <div className="container">
      <p className="fs-1 text-center pt-3">プリコネタイマー</p>
      <div className="alert alert-warning mt-3" role="alert">音が出るから注意してね</div>
      <div className="alert alert-primary mt-3" role="alert">高精度のタイマーとしては使わないでね</div>
      <div className="fw-bold">アラームの声</div>
      <div className="form-check">
        <input id="peko" type="radio" name="voice" className="form-check-input" checked={voice === "peko"} value="peko" onChange={e => setVoice(e.target.value as typeof voice)} />
        <label className="form-check-label" htmlFor='peko'>ペコリーヌ</label>
      </div>
      <div className="form-check">
        <input id="kokkoro" type="radio" name="voice" className="form-check-input" checked={voice === "kokkoro"} value="kokkoro" onChange={e => setVoice(e.target.value as typeof voice)} />
        <label className="form-check-label" htmlFor='kokkoro'>コッコロ</label>
      </div>
      <div className="form-check">
        <input id="kyaru" type="radio" name="voice" className="form-check-input" checked={voice === "kyaru"} value="kyaru" onChange={e => setVoice(e.target.value as typeof voice)} />
        <label className="form-check-label" htmlFor='kyaru'>キャル</label>
      </div>
      <div className="row mt-3">
        <div className="col-4">
          <label className="form-label fw-bold" htmlFor='hour'>時間</label>
          <select id="hour" className="form-select" value={timer.hour} onChange={e => setTimer(pre => ({...pre, hour: parseInt(e.target.value)}))}>
            {
              [...Array(100)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))
            }
          </select>
        </div>
        <div className="col-4">
          <label className="form-label fw-bold" htmlFor='minute'>分</label>
          <select id="minute" className="form-select" value={timer.minute} onChange={e => setTimer(pre => ({...pre, minute: parseInt(e.target.value)}))}>
            {
              [...Array(60)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))
            }
          </select>
        </div>
        <div className="col-4">
          <label className="form-label fw-bold" htmlFor='second'>秒</label>
          <select id="second" className="form-select" value={timer.second} onChange={e => setTimer(pre => ({...pre, second: parseInt(e.target.value)}))}>
            {
              [...Array(60)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))
            }
          </select>
        </div>
      </div>
      <button type="button" className="btn btn-primary mt-3" onClick={start} disabled={timer.hour === 0 && timer.minute === 0 && timer.second === 0}>スタート</button>
      <button type="button" className="btn btn-danger ms-3 mt-3" onClick={stop} disabled={id === -1}>ストップ</button>
      <button type="button" className="btn btn-success ms-3 mt-3" onClick={resume} disabled={!stopped}>再開</button>
      <p className="fw-bold mt-3">残り時間</p>
      <p className="fs-3">{
        "0".repeat(2 - Math.trunc(counter / 3600).toString().length) + 
        Math.trunc(counter / 3600) + ":" +
        "0".repeat(2 - (Math.trunc(counter / 60) % 60).toString().length) + 
        (Math.trunc(counter / 60) % 60) + ":" +
        "0".repeat(2 - (counter % 60).toString().length) + 
        (counter % 60)
      }</p>
      <button type="button" className="btn btn-primary" onClick={mute} disabled={!alerted}>アラーム停止</button>
      <audio id="pekoAudio" src="peko.mp3" loop preload="auto" className="d-none" />
      <audio id="kokkoroAudio" src="kokkoro.mp3" loop preload="auto" className="d-none" />
      <audio id="kyaruAudio" src="kyaru.mp3" loop preload="auto" className="d-none" />
    </div>
  )
}

export default Home
