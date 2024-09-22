// Checking if logged in
window.onload = ()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(!isLoggedIn){
        window.location.href = "login.html";
    }
}

//Logout functionality
document.getElementById("logout-btn").addEventListener("click", function(event){
    event.preventDefault();
    const isConfirmed = confirm("Do you want to logout?");

    if(isConfirmed){
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login.html";
    }
});

document.getElementById("success-dialog-remover").addEventListener("click", function(){
    document.getElementById("success-dialog").classList.add("opacity-0");
    setTimeout(function(){
        document.getElementById("success-dialog").classList.add("hidden");
    }, 100);
})

//Showing single items when a user clicks a specific menu
function actionInit(btn, itemId){
    document.getElementById(btn).addEventListener("click", function(event){
        event.preventDefault();

        navigate(btn, itemId);
    })
}

actionInit("transaction-btn", "transaction-history");
actionInit("add-money-btn", "add-money");
actionInit("cashout-btn", "cashout");
actionInit("transfer-btn", "transfer");
actionInit("get-bonus-btn", "get-bonus");
actionInit("pay-bill-btn", "pay-bill");

//Callback for add money
function addMoneyOrPayBill(bankName, bankAc, amountOfMoney, isPayBill){
    const bankOrBillType = document.getElementById(bankName).value;
    const bank_ac = getNum(bankAc);
    const amount = getNum(amountOfMoney, true);
    const balance = parseFloat(document.getElementById("current-balance").innerText);

    if(!bankOrBillType){
        alert("Please select your bank!");
        return;
    }

    if(isNaN(bank_ac) || isNaN(amount) || isNaN(balance)){
        alert(isPayBill ? "Failed to pay bill!" : "Failed to add money!");
        return;
    }

    const bank_ac_len = bank_ac.toString().length;
    if(bank_ac_len>11 || bank_ac_len<11){
        alert("Please enter 11 digit account number!");
        return;
    }

    if(isPayBill && amount>balance){
        alert("Insufficient balance!");
        return;
    }

    return {
        balance: isPayBill ? balance - amount : amount + balance,
        title: isPayBill ? bankOrBillType : "Add Money",
        thumb: isPayBill ? "pay" : "addMoney",
        type: isPayBill ? "red" : "green",
        amount
    }
}

//Action for add money
actionForm("add-money-form", "pin-number", ()=>addMoneyOrPayBill("select-bank", "bank-ac-no", "add-amount"));

// Action for pay bill
actionForm("pay-bill-form", "pay-bill-pin", ()=>addMoneyOrPayBill("pay-bill-type", "biller-ac-no", "amount-to-pay", true))


//Callback for cashout and transfer money
function cashoutOrTransfer(agentOrUser, amountOfMoney, isCashout){
    const agent = getNum(agentOrUser);
    const amount = getNum(amountOfMoney, true);
    const balance = parseFloat(document.getElementById("current-balance").innerText);

    if(isNaN(agent) || isNaN(amount) || isNaN(balance)){
        alert("Failed to cashout!");
        return;
    }

    const agentLen = agent.toString().length;
    if(agentLen>11 || agentLen<11){
        alert(`Please enter 11 digit ${isCashout ? "agent" : "account"} number!`);
        return;
    }

    if(amount>balance){
        alert("Insufficient balance!");
        return;
    }

    return {
        balance: balance - amount,
        title: isCashout ? "Cashout" : "Transfer Money",
        thumb: isCashout ? "cashout" : "transfer",
        type: "red",
        amount
    }
}

//Action for cashout
actionForm("cashout-form", "cashout-pin", ()=>cashoutOrTransfer("agent-no", "cashout-amount", true));


//Action for transfer money
actionForm("transfer-money-form", "transfer-pin", ()=>cashoutOrTransfer("user-ac-no", "transfer-amount"));


// Callback for get bonus
function getBonus(){
    const coupon = document.getElementById("coupon-code").value;
    const balance = parseFloat(document.getElementById("current-balance").innerText);

    if(isNaN(balance)){
        alert("Failed to get bonus!");
        return;
    }

    if(coupon === "es6-1500"){
        return {
            balance: balance + 1500,
            title: "Bonus with coupon code",
            thumb: "bonus",
            type: "green",
            amount: 1500
        }
    }

    alert("No bonus available with this coupon!");
    return;
}

// Action for get bonus
actionForm("get-bonus-form", "get-bonus-pin", getBonus);