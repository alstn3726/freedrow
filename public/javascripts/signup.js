$(document).ready(function(e) {
    let id_bool = 0;
    let pw_bool = 0;
    let re_pw_bool = 0;
    let name_bool = 0;
    let phone_bool = 0;
    let email_bool = 0;

// 중복확인 & id 유효성검사 
    $("#id").focusout(()=> {
        let input_id = $("#id").val();
        let id_pattern = /^[a-z][a-z\d]{4,11}$/;
        let id_res = id_pattern.test(input_id);

        
        if(input_id == ""){
            $(".id_regex").html("필수 입력");
            id_bool = 1;
            $("#signupbtn").attr("disabled", "true");
        }else{
            if(!id_res){
                $(".id_regex").html("영어 소문자,숫자 4-12자리");
                $(".id_regex").css("color","red");
                id_bool = 1;
                $("#signupbtn").attr("disabled", "true");
            }else{
                $.ajax({
                    url: "/signup/checkId",
                    type: "POST",
                    data: {
                        'data': input_id
                    },
                    dataType: "json",
                    success: (result)=>{
                        if(result['result'] == true) {
                            $(".id_regex").html("사용 가능한 아이디");
                            $(".id_regex").css("color","red");
                            id_bool = 0;
                            if((id_bool||pw_bool||re_pw_bool||name_bool||phone_bool||email_bool) == 0) {
                                $("#signupbtn").attr("disabled", false);
                            }
                        }
                        else {
                            $(".id_regex").html("중복된 아이디");
                            id_bool = 1;
                            $("#signupbtn").attr("disabled", "true");
                            }
                        },
                    });
                }
            }
        });
//비밀번호 유효성검사
    $("#pw").on("keyup", function() {
        let pw = $("#pw").val();
        let pw_pattern = /^[A-Za-z\d]{8,12}$/;
        let pw_res = pw_pattern.test(pw);

        if(pw_res) {
            $(".pw_regex").html("");
            pw_bool = 0;
            if((id_bool||pw_bool||re_pw_bool||name_bool||phone_bool||email_bool) != 1) {
                $("#signupbtn").removeAttr("disabled");
            }
        }
        else {
            $(".pw_regex").html("영어대소문자,숫자 8-11자리");
            $(".pw_regex").css("color","red");
            pw_bool = 1;
            $("#signupbtn").attr("disabled", "disabled");
        }
    });
//비밀번호 확인
    $("#repw").on("keyup", function() {
        if($("#pw").val() !== $("#repw").val()) {
            $(".repw_regex").html("입력값이 다름");
            $(".repw_regex").css("color","red");
            re_pw_bool = 1;
            $("#signupbtn").attr("disabled", "disabled");
        }
        else {
            $(".repw_regex").html("비밀번호 일치");
            re_pw_bool = 0;
            if((id_bool||pw_bool||re_pw_bool||name_bool||phone_bool||email_bool) != 1) {
                $("#signupbtn").removeAttr("disabled");
            }
        }
    });
//이름 유효성검사
    $("#name").on("keyup", function() {
        let name = $("#name").val();
        let name_pattern = /[가-힣]{2,}/;
        let name_res = name_pattern.test(name);

        if(name_res) {
            $(".name_regex").html("");
            name_bool = 0;
            if((id_bool||pw_bool||re_pw_bool||name_bool||phone_bool||email_bool) != 1) {
                $("#signupbtn").removeAttr("disabled");
            }
        }
        else {
            $(".name_regex").html("한글만 입력 가능합니다.");
            $(".name_regex").css("color","red");
            name_bool = 1;
            $("#signupbtn").attr("disabled", "disabled");
        }
    });
//전화번호 유효성검사
    $("#phone").on("keyup", function() {
        let phone = $("#phone").val();
        let phone_pattern = /^01\d\d{3,4}\d{4}$/;
        let phone_res = phone_pattern.test(phone);

        if(!phone_res) {
            $(".phone_regex").html("잘못된 형식 입니다.");
            $(".phone_regex").css("color","red");
            phone_bool = 1;
            $("#signupbtn").attr("disabled", "disabled");
        }
        else {
            $(".phone_regex").html("");
            phone_bool = 0;
            if((id_bool||pw_bool||re_pw_bool||name_bool||phone_bool||email_bool) != 1) {
                $("#signupbtn").removeAttr("disabled");
            }
        }
    });
//email유효성 검사, 중복검사

        $("#email").focusout(()=> {
        let input_email = $("#email").val();
        let email_pattern = /.+@[a-z]+(\.[a-z]+){1,2}$/;
        let email_res = email_pattern.test(input_email);
        
        if(input_email == ""){
            $(".email_regex").html("필수 입력");
            email_bool = 1;
            $("#signupbtn").attr("disabled", "true");
        }else{
            if(!email_res){
                $(".email_regex").html("잘못된 형식 입니다.");
                $(".email_regex").css("color","red");
                email_bool = 1;
                $("#signupbtn").attr("disabled", "true");
            }else{
                $.ajax({
                    url: "/signup/checkEmail",
                    type: "POST",
                    data: {
                        'data': input_email
                    },
                    dataType: "json",
                    success: (result)=>{
                        if(result['result'] == true) {
                            $(".email_regex").html("사용 가능한 이메일");
                            $(".email_regex").css("color","red");
                            email_bool = 0;
                            if((id_bool||pw_bool||re_pw_bool||name_bool||phone_bool||email_bool) == 0) {
                                $("#signupbtn").attr("disabled", false);
                            }
                        }
                        else {
                            $(".email_regex").html("중복된 아이디");
                            email_bool = 1;
                            $("#signupbtn").attr("disabled", "true");
                            }
                        },
                    });
                }
            }
        });
    $('#signupbtn').submit();
});
