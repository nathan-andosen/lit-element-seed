// allow us to import css files in typescript like:
// import style from './status-alert.style.css';

declare module '*.css' {
  const content: any;
  export default content;
}
