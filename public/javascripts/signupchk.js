const form = document.querySelector('#form_wrap');//데이터 전송 폼
const checkAll = document.querySelector('.terms_check_all input');//모두 동의 체크박스
const checkBoxes = document.querySelectorAll('.input_check input');//모두동의 제외 3개의 체크박스
const submitButton = document.querySelector('.next-button');//확인 버튼

const agreements = {
    termsOfService: false, //첫번째 필수동의 체크박스
    privacyPolicy: false, //두번째 필수동의 체크박스
    allowPromotions: false, //이벤트 수신 동의 체크박스(선택)
};
//새로고침 되는 거 막음
form.addEventListener('submit', (e) => e.preventDefault());
//체크박스에 input 이벤트가 발생할 때마다 toggledcheckbox(); 함수 실행
checkBoxes.forEach((item)=>item.addEventListener('input', toggleCheckbox));

//이벤트가 발생된 요소를 받아와 id와checked값을 변수에 담고
//agreements Object에 id값고 동일한 곳에 checked값을 넣어준다음
//checkAllstatus()를 실행하고 togglesubmitbutton() 함수를 실행.
function toggleCheckbox(e){
    const {checked, id} = e.target;
    agreements[id] = checked;
    this.parentNode.classList.toggle('active');
    checkAllStatus();
    toggleSubmitButton();
}
//모든항목 체크시 모두동의 체크박스 체크됨 아니면 체크해제
function checkAllStatus(){
    const {termsOfService, privacyPolicy, allowPromotions} = agreements;
    if(termsOfService && privacyPolicy && allowPromotions){
        checkAll.checked = true;
    }else{
        checkAll.checked = false;
    }
}
//필수항목 두개 모두 체크시 확인 버튼 활성화 아니면 비활성화
function toggleSubmitButton(){
    const {termsOfService, privacyPolicy} = agreements;
    if(termsOfService && privacyPolicy){
        submitButton.disabled = false;
    }else{
        submitButton.disabled = true;
    };
};
//모두동의 체크박스 클릭시 event발생 event발생 요소가 target이됨
//e.target 은 모두동의 체크박스
checkAll.addEventListener('click',(e)=>{
    const{checked} = e.target; //checkbox의 체크 상태를 확인 하는 checked는 true(체크o)&flase(체크x)반환.
                               //const checked = e.target.checked; 와 같음.
    //체크가 되면 if문 실행
    if(checked){
        checkBoxes.forEach((item)=>{
            item.checked = true;
            agreements[item.id] = true;
            item.parentNode.classList.add('active');
        });
    }else{
        checkBoxes.forEach((item)=>{
            item.checked = false;
            agreements[item.id] = false;
            item.parentNode.classList.remove('active');
        });
    }
    toggleSubmitButton();
});
