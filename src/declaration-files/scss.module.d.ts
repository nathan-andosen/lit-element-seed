// allow us to import scss files in typescript like:
// import style from './status-alert.style.scss';

declare module '*.scss' {
  const content: any;
  export default content;
}
