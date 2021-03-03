import handleSubmit from './js/app'
import './styles/style.scss'

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        handleSubmit()

    })
});
export {
    handleSubmit
}