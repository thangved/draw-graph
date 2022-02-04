import core from './core';
import intro from './intro';

core()
if (!JSON.parse(localStorage.getItem('intro_showed') || 'false')) {
    intro()
    localStorage.setItem('intro_showed', 'true')
}
document.getElementById('openIntroButton').addEventListener('click', () => {
    intro()
})