
let data=[];
const buttons=document.querySelectorAll(".btn");
const add=document.querySelector(".InvoiceBox");
const del=document.querySelector(".deleteBox");
const edit=document.querySelector(".editBox");

const checkAll=document.getElementById("checkAll");

var selectedrows=[];
let page_number=0;
    
const displaybox=document.querySelector(".display-box");
//fetching the data from the api
async function fetchData() {
    let api = "http://localhost:8080/H2HBABBA2452/display?page_number="+page_number;
    let response = await fetch(api);
    let json = await response.json();
    json.forEach(obj => {
        for(let i =0;i<1;i++){
            let temp = [];
            temp.push(obj.name_customer,obj.cust_number.toString(),obj.invoice_id.toString(),obj.total_open_amount.toString(), obj.due_in_date,obj.predicted_date,obj.notes)
            data.push(temp)
        }
    });
    
}
if(page_number==0){
    fetchData();
    show();
}
 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//The main function which will display details present in the table and all the present button functionalities
function show() {
    

sleep(2000).then(() =>{
    const table=document.querySelector(".table");
    data.forEach(function(response,index){
        const tr=document.createElement('tr');
        const td=document.createElement('td');
        const checkbox=document.createElement('input');
        tr.setAttribute('id',`${index}tr`);
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute('class','check');
        checkbox.setAttribute('id',index);
        checkbox.checked=false;
        td.appendChild(checkbox);
        tr.appendChild(td);
        
        response.forEach(function(element){
            const tdval=document.createElement('td');
            if(element===undefined){
                tdval.innerText="-"
            }
            else{
                tdval.innerText=element;
            }
    
            
            
    
            
            tr.appendChild(tdval);
            
        });
        if (index % 2 === 1) {
            tr.classList.add("dark");
        }
    
        
        table.appendChild(tr);
    });
    
    
    buttons.forEach(function(buttona) {
        buttona.addEventListener("click",function(){
            const item=document.getElementById(buttona.id);
            //Whenever the add button is pressed displaybox gets appended by this add button class and same goes for delete and edit
            if(item.id==="add"){
                displaybox.style.display="block";
                add.style.display="block";
                displaybox.appendChild(add);
    
            }
            if(item.id==="delete"){
                if(selectedrows.length===0){
                    alert('No row selected');
                }
                else{
                    displaybox.style.display="block";
                    del.style.display="block";
                    displaybox.appendChild(del);
                }
                
    
            }
            if(item.id==="edit"){
                if(selectedrows.length===0){
                    alert('No row selected');
                }
                else if(selectedrows.length>1){
                    alert('Multiple rows selected')
                }
                else{
                    displaybox.style.display="block";
                    edit.style.display="block";
                    displaybox.appendChild(edit);
                   
                }
                
    
            }
           
            
        });
    });
    //taking the checkbox id which are selected and adding the blue class to it
    const check=document.querySelectorAll(".check");
    check.forEach(function(ch) {
        ch.addEventListener("click",function(){
        const checked=document.querySelectorAll(".check:checked");
        const selectedbox=[];
        checked.forEach(function(cd) {
            selectedbox.push(cd.id);
        });
        selectedbox.forEach(function(select) {
            document.getElementById(`${select}tr`).classList.add("blue");
        });
    
        data.forEach(function (response,index) {
            if(!selectedbox.includes(`${index}`)){
                document.getElementById(`${index}tr`).classList.remove("blue");
            }
        })
        if(data.length===selectedbox.length){
            if(checkAll.checked===false)
            checkAll.checked=true;
        }
        if(data.length!==selectedbox.length){
            if(checkAll.checked===true)
            checkAll.checked=false;
        }
        selectedrows=[...selectedbox];
        })
        
        
    })

    //taking the id of checkall box and making all the rows selected if it is selected and unselecting it if all the rows are unselected
    checkAll.addEventListener("click",function(){
        if(checkAll.checked===true){
            const indexList=[];
            data.forEach(function(response,index){
                document.getElementById(index).checked=true;
                document.getElementById(`${index}tr`).classList.add("blue");
                indexList.push(index);
            })
            selectedrows=[...indexList];
    
        }
        else{
            data.forEach(function(response,index){
                document.getElementById(index).checked=false;
                document.getElementById(`${index}tr`).classList.remove("blue");
                
            })
            selectedrows=[...[]];
        }
    });


});
}




//all different closing tags
const close=document.querySelectorAll(".cross");
close.forEach(function(cl){
    cl.addEventListener("click",function() {
        displaybox.removeChild(displaybox.lastChild);
        displaybox.style.display="none";
        
    })
});
const cancel=document.querySelectorAll("a");
cancel.forEach(function(cl){
    cl.addEventListener("click",function() {
        displaybox.removeChild(displaybox.lastChild);
        displaybox.style.display="none";
        
    });
});
const clear=document.querySelectorAll(".clear");
clear.forEach(function(k) {
    k.addEventListener("click",function() {
        if(`${k.id}`==="Reset"){
            document.querySelectorAll(".editBox input, .editBox textarea").forEach(function(item) {
                item.value="";
            })
        }
        if(`${k.id}`==="Clear"){
            document.querySelectorAll(".InvoiceBox input, .InvoiceBox textarea").forEach(function(item) {
                item.value="";
            })
        }
    });
});

//to go to the next page
async function next(){
    
    document.getElementById('prev').disabled = false;
    
    page_number = page_number + 1;
    data=[];


    var tableHeaderRowCount = 1;
    var table = document.querySelector('table');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    fetchData();
    show();
    


}
//to go to the previous page
async function prev(){
    if(page_number < 0){
        page_number = 0;
    }
    else{
       
        page_number = page_number - 1;
    }




    data=[];

    var tableHeaderRowCount = 1;
    var table = document.querySelector('table');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    fetchData();
    show();

}

//adding data to the database from add button
async function addfunc(){
    var custname = document.getElementById('CustName').value;
    var custno = document.getElementById('CustNo').value;
    var invoiceno =document.getElementById('InvoNo').value;
    var invoiceamt =document.getElementById('InvoAmt').value;
    var due_date =document.getElementById('DueDate').value;
    var notes =document.getElementById('ttar').value;
    var apilo = "http://localhost:8080/H2HBABBA2452/Add?"+"name_customer="+custname+"&"+"cust_number="+custno+"&"+"invoice_id="+invoiceno+"&"+"total_open_amount="+invoiceamt+"&"+"due_in_date="+due_date+"&"+"notes="+notes;
    let response = await fetch(apilo, {method: "POST"});
    console.log(response);
    console.log("Clicked");
    document.location.reload();
}
//editing the data in the database from edit button
async function dataedit(){
    var checked = document.querySelector(".check:checked").id;

    var invoiceno=data[checked][2];
        

    var invoiceamt= document.querySelector("#edit-amount").value ;
    var notes=document.querySelector("#ttar1").value ;
    var apiedit = "http://localhost:8080/H2HBABBA2452/Edit?"+"invoice_id="+invoiceno+"&"+"total_open_amount="+invoiceamt+"&"+"notes="+notes;
    let response = await fetch(apiedit, {method: "POST"});
    document.location.reload();
    
}





//deleting data from database from delete button
function deletedata(){
    var checked = document.querySelectorAll(".check:checked");
    var indexes = [];

    checked.forEach((checkBox) => {
        indexes.push(checkBox.id);
    });

    indexes.forEach(async (index) => {
        var a = data[index][2];
        var apidel = "http://localhost:8080/H2HBABBA2452/Delete?invoice_id="+a;
        let response = await fetch(apidel, {method: "POST"});
        let abc = await response.json();
        console.log(abc);
    });
    document.location.reload();

}

//for searching the invoice id 
async function search(){
    data=[];
    var a = document.getElementById('searchBar').value;
    var apisel = "http://localhost:8080/H2HBABBA2452/Search?invoice_id="+a;
    let response = await fetch(apisel, {method: "POST"});
    let abc = await response.json();
    console.log(abc);

    abc.forEach(obj => {
        for(let i =0;i<1;i++){
            console.log(obj);
            let temp = [];
            temp.push(obj.name_customer,obj.cust_number.toString(),obj.invoice_id.toString(),obj.total_open_amount.toString(), obj.due_in_date,obj.predicted_date,obj.notes)
            console.log(temp)
            data.push(temp)
        }
    });

    var tableHeaderRowCount = 1;
    var table = document.querySelector(".table");
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    show();

}






