function getNum(id, isFloat){
    const val = document.getElementById(id).value;
    return isFloat ? parseFloat(val) : parseInt(val);
}

function actionForm(formId, pinId, callback){
    document.getElementById(formId).addEventListener("submit", function(event){
        event.preventDefault();

        const pin  = getNum(pinId);
        if(pin===1234){
            const initAction = callback();
            if(!initAction)return;
            finalJobAfterTransaction(formId, initAction);
        }else{
            alert("Incorrect pin!");
        }
    })
}

function finalJobAfterTransaction(formId, action){
    const isConfirmed = confirm("Do you want to proceed?");
    if(isConfirmed){
        navigate(null, "");
        const div = createRecord(action);
        removeEmptyMsg("empty-transaction");
        document.getElementById("transaction-history-list").prepend(div);
        
        if(action.type==='red'){
            removeEmptyMsg("empty-latest-payment");
            const paymentList = document.getElementById("latest-payment-list");
            if(paymentList.childElementCount>4)return;
            const newDiv = div.cloneNode(true);
            paymentList.prepend(newDiv);
        }

        document.getElementById(formId).reset();
        document.getElementById("success-dialog").classList.remove("hidden");
        setTimeout(function(){
            document.getElementById("success-dialog").classList.remove("opacity-0");
        }, 100);
    }
}


function removeEmptyMsg(id){
    const el = document.getElementById(id);
    el && el.remove();
}

function createRecord(action){
    const {balance, title, thumb, amount, type} = action;
    const date = new Date(Date.now());
    let hour = date.getHours();
    const amPm = hour > 11 ? "PM" : "AM";
    hour = hour < 1 ? 12 : hour;
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour < 10 ? "0" + hour : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    document.getElementById("current-balance").innerText = balance;

    const div = document.createElement('div');
    div.className = "flex justify-between items-center mt-4 bg-white border border-stone-300 rounded-xl px-4 py-3";
    div.innerHTML = `<div class="flex items-center gap-3">
            <div class="bg-[#F4F5F7] p-3 rounded-full">
                <img class="w-7" src="img/${thumb}.png">
            </div>

            <div>
                <h4 class="text-[#080808] font-extrabold text-xl">${title}</h4>
                <p class="text-[#080808B3]">Today ${hour}:${minute} ${amPm}</p>
            </div>
        </div>
    </div>
    
    <span class="text-${type}-600 text-xl">${type==="red" ? "-" : "+"}${amount}</span>
    `;

    return div;
}

function navigate(btn, itemId){
    const activeBtn = document.querySelector("button.border-blue-500.text-blue-500");
    if(activeBtn){
        activeBtn.className = "text-center border border-stone-300 text-[#080808B3] text-base font-bold rounded-xl py-5 hover:border-blue-500 hover:text-blue-500 hover:bg-[#0874F20D] transition";
    }

    if(btn){
        document.getElementById(btn).className = "text-center border border-blue-500 text-blue-500 bg-[#0874F20D] text-base font-bold rounded-xl py-5";
    }

    document.querySelector(".item:not(.hidden)").classList.add("hidden");
    document.getElementById(itemId || "latest-payments").classList.remove("hidden");
    window.location.hash = "#"+itemId;
}