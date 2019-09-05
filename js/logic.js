//=================================
/*初始变量区*/
let v_balance;
let v_rate;
let v_paytime;
let v_timetype;
/*中间变量区*/
let t_year;
let t_month;

let t_real_mrate;
let t_real_yrate;
let t_real_drate;
let t_real_bwrate;
/*结果区*/
let r_month_topay;
let r_m_all_intr;
let r_m_per_intr;

let r_bweek_topay;
let r_bw_all_intr;
let r_bw_per_intr;

let r_m_line;
let r_bw_line;

let r_txt;
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
let fresh_btn = document.getElementById("refresh-btn");
let cal_btn = document.getElementById("calculate_btn");
let cls_btn = document.getElementById("clear_btn");

let dl_txt_btn=document.getElementById("dowload-txt");
//==================================
/*结果呈现区*/
let monthtotal = document.getElementById("mon-intrest");
let monthpay = document.getElementById("month-pay");
let monthintr = document.getElementById("month-intr");

let biweektotal = document.getElementById("bi-intrest");
let biweekpay = document.getElementById("biweek-pay");
let biweekintr = document.getElementById("biweek-intr");
//==================================
let tbody = document.getElementById("tbody");
//==================================
fresh_btn.addEventListener('click', () => {
    window.location.reload();
})
cal_btn.addEventListener('click', () => {
    Calculate();
});
cls_btn.addEventListener('click', () => {
    Clear();
    ClearTable();
});
dl_txt_btn.addEventListener('click',()=>{
    DownLoadTxt('result.txt',r_txt);
})
//==================================
function CheckValue() {
    if (balance.value.length < 1 || rate.value.length < 1 || paytime.value.length < 1 || timeselect.value.length < 1) {
        alert("请完整填写参数");
        return false;
    } else if (rate.value > 100 || rate.value < 0) {
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

    SetValue("未计算", "未计算", "未计算", "未计算", "未计算", "未计算");
    tbody.innerHTML = "";

    v_balance = null;
    v_paytime = null;
    v_rate = null;
    v_timetype = null;
}

function ClearTable() {
    tbody.innerHTML = "";
}

function SetValue(m_total, m_pay, m_int, bi_total, bi_pay, bi_int) {
    monthtotal.value = m_total;
    monthpay.value = m_pay;
    monthintr.value = m_int;

    biweektotal.value = bi_total;
    biweekpay.value = bi_pay;
    biweekintr.value = bi_int;
}

function Calculate() {
    if (CheckValue() == true) {
        //set default value
        ClearTable();
        v_balance = parseFloat(balance.value);
        v_paytime = parseInt(paytime.value);
        v_rate = parseFloat(rate.value) / 100;
        v_timetype = parseInt(timeselect.value);

        console.log("balance:" + v_balance);
        console.log("paytime:" + v_paytime);
        console.log("rate:" + v_rate);
        console.log("type:" + v_timetype);

        if (v_timetype == 1) {
            t_year = v_paytime;
            t_month = t_year * 12;
        } else {
            t_month = v_paytime;
            t_year = Math.ceil(t_month / 12);
        }

        console.log("year:" + t_year);
        console.log("month:" + t_month);

        //月供
        t_real_mrate = v_rate / 12;//真实月利率

        let t_q = 1 / (t_real_mrate + 1);
        r_month_topay = v_balance * ((t_q - 1) / (t_q * (Math.pow((t_q), t_month) - 1)));
        r_m_all_intr = r_month_topay * t_month - v_balance;
        r_m_per_intr = r_m_all_intr / t_month;

        let t_current_balance = v_balance;
        r_m_line = new Array();
        for (let i = 1; i <= t_month; i++) {
            let t_pay_perbalance = r_month_topay - t_current_balance * t_real_mrate;
            t_current_balance -= t_pay_perbalance;
            if (i % 12 == 0) {
                let temp = t_current_balance.toFixed(2);
                r_m_line.push(temp);
            }
        }

        console.log(r_m_line);

        r_month_topay = r_month_topay.toFixed(2);
        r_m_all_intr = r_m_all_intr.toFixed(2);
        r_m_per_intr = r_m_per_intr.toFixed(2);

        r_txt=  "计算结果(￥)\n月供："+r_month_topay.toString()
                +"\n月供式总利息："+r_m_all_intr.toString()
                +"\n月供每月利息："+r_m_per_intr.toString();
        //双周供
        t_real_yrate = Math.pow((1 + t_real_mrate), 12) - 1;
        t_real_drate = Math.pow((1 + t_real_yrate), (1 / 365)) - 1;
        t_real_bwrate = Math.pow((1 + t_real_drate), 14) - 1;

        t_q = 1 / (t_real_bwrate + 1);
        r_bweek_topay = v_balance * ((t_q - 1) / (t_q * (Math.pow((t_q), t_year * 26) - 1)));
        r_bw_all_intr = t_year * 26 * r_bweek_topay - v_balance;
        r_bw_per_intr = r_bw_all_intr / (t_year * 26);

        t_current_balance = v_balance;
        r_bw_line = new Array();
        for (let i = 1; i <= t_year * 26; i++) {
            let t_pay_current = r_bweek_topay - t_current_balance * t_real_bwrate;
            t_current_balance -= t_pay_current;
            if (i % 26 == 0) {
                let temp = t_current_balance.toFixed(2);
                r_bw_line.push(temp);
            }
        }

        console.log(r_bw_line);

        r_bweek_topay = r_bweek_topay.toFixed(2);
        r_bw_all_intr = r_bw_all_intr.toFixed(2);
        r_bw_per_intr = r_bw_per_intr.toFixed(2);

        r_txt+= "\n\n双周供："+r_bweek_topay.toString()
                +"\n双周供式总利息："+r_bw_all_intr.toString()
                +"\n双周供每期利息："+r_bw_per_intr.toString();

        SetValue(r_m_all_intr, r_month_topay, r_m_per_intr, r_bw_all_intr, r_bweek_topay, r_bw_per_intr);

        if (istableshow) {
            for (let i = 0; i < t_year; i++) {
                AddTableElement(i + 1, r_m_line[i], r_bw_line[i]);
            }
        }

    }
}

function DownLoadTxt(filename, text) {
    var pom = document.createElement("a");
    pom.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    pom.setAttribute("download", filename);
    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

//====================================
// let testbtn=document.getElementById("test-btn");
// testbtn.addEventListener('click',()=>{
//     AddTableElement();
// })
//====================================
/**
 * powered by Fungus-Light
 * https://github.com/Fungus-Light
 */