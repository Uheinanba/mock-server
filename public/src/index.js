import init from './core/init';
import './app.less';

$('.j-btn__add').on('click', () => {
  $('.j-mock-form__modal').modal('show');
});
// $('.dropdown-toggle').dropdown();
/* $('.dropdown-toggle').dropdown('toggle');
$('.j-dropdown-menu__wrap').on('hidden.bs.dropdown', () => {
  console.log(3434);
}); */
init();
