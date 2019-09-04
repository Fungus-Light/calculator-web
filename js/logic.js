M.AutoInit();
//=================================
/*初始变量区*/
let v_balance;
let v_rate;
let v_paytime;
let v_timetype;
/*中间变量区*/

/*结果区*/

//=================================
let istableshow = false;
//=================================
/*参数区*/
let balance = document.getElementById("balance");
let rate = document.getElementById("rate");
let paytime = document.getElementById("paytime");

let timeselect = document.getElementById("time_type");
let tablescwitcher = document.getElementById("istableshow");
tablescwitcher.addEventListener('click', () => {
    istableshow = !istableshow;
})
//==================================
/*功能按钮*/
let cal_btn = document.getElementById("calculate_btn");
let cls_btn = document.getElementById("clear_btn");
//==================================
/*结果呈现区*/
let monthtotal=document.getElementById("mon-intrest");
let monthpay=document.getElementById("month-pay");
let monthintr=document.getElementById("month-intr");

let biweektotal=document.getElementById("bi-intrest");
let biweekpay=document.getElementById("biweek-pay");
let biweekintr=document.getElementById("biweek-intr");
//==================================
let tbody=document.getElementById("tbody");
//==================================
cal_btn.addEventListener('click', () => {
    Calculate();
});
cls_btn.addEventListener('click', () => {
    Clear();
});
//==================================
function CheckValue() {
    if (balance.value.length < 1 || rate.value.length < 1 || paytime.value.length < 1 || timeselect.value.length < 1) {
        alert("请完整填写参数");
        return false;
    }else if(rate.value>100||rate.value<0){
        alert("利率超过范围");
    }
    else {
        console.log(balance.value);
        console.log(rate.value);
        console.log(paytime.value);
        console.log(timeselect.value);
        console.log(istableshow);
        return true;
    }
}

function Clear() {
    balance.value = "";
    rate.value = "";
    paytime.value = "";

    SetValue("未计算","未计算","未计算","未计算","未计算","未计算");
    tbody.innerHTML="";

    v_balance=null;
    v_paytime=null;
    v_rate=null;
    v_timetype=null;
}

function SetValue(m_total,m_pay,m_int,bi_total,bi_pay,bi_int){
    monthtotal.value=m_total;
    monthpay.value=m_pay;
    monthintr.value=m_int;

    biweektotal.value=bi_total;
    biweekpay.value=bi_pay;
    biweekintr.value=bi_int;
}

function Calculate(){
    if(CheckValue()==true){
        v_balance=balance.value;
        v_paytime=paytime.value;
        v_rate=rate.value;
        v_timetype=timeselect.value;
    }
}
/**
 * powered by Fungus-Light
 */