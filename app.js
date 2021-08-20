var uiController = (function() {
    var DOMstrings={
        inputType:".add__type",
        inputDescription:".add__description",
        inputValue:".add__value",
        inputBtn: ".add__btn",
        incomeList:".income__list",
        expenseList:".expenses__list"
    };

    return {
        getInput:function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description:document.querySelector(DOMstrings.inputDescription).value,
                value : parseInt(document.querySelector(DOMstrings.inputValue).value),
            };
        },
        getDOMstrings: function(){
            return DOMstrings;

        },
        clearFields:function(){
            var fields=document.querySelectorAll (DOMstrings.inputDescription+','+DOMstrings.inputValue);
            // Convert list to Array
            var fieldsArr = Array.prototype.slice.call(fields);
            // forEach element bolgonoor ni dawtalt hiih
            fieldsArr.forEach(function(el,index,array){
                el.value="";
            });
            fieldsArr[0].focus();
            // for(var i=0; i<fieldsArr.length;i++){
            //     fieldsArr[i].value="";
            // }

        },

        addListItem: function(item,type){
            // Orlogo zarlagiin elementiig aguulsan html iig beltgene
            var html, list;
            
            if(type ==='inc'){
                list=DOMstrings.incomeList;
                html='<div class="item clearfix" id="income-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">+ %Value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                list=DOMstrings.expenseList;
                html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">- %Value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // ter html deer dotroo orlogo zarlagiin utguudiig REPLACE ashiglan oorchilj ogno
            htnl=html.replace('%id%',item.id);
            html=html.replace('%Description%',item.description);
            html=html.replace('%Value%',item.value);

            // Beltgesen HTML ee DOM ruu hiine.
            document.querySelector(list).insertAdjacentHTML('beforeend',html);
        }
    };

})();
// Sanhuu
var financeController = (function() {
    // private function
    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    //private function
    var Expense=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    var calculateTotal=function(type){
        var sum=0;
        data.items[type].forEach(function(el){
            sum=sum+el.value;
            
        });
        data.totals[type]=sum;
    }
    var data={
        items:{
            inc:[],
            exp:[]
        },
        totals:{
            inc:0,
            exp:0
        },
        tusuv: 0,
        huwi:0
    };
    return {
        tusuvTootsooloh:function(){
            // orlogiin niiloberiig tootsoolno
            calculateTotal('inc');
            calculateTotal('exp');
            // Tuswiig shineer tootsoolno
            data.tusuv=data.totals.inc-data.totals.exp;
            // orlogo zarlagiin huwiig tootsoolno.
            data.huwi=Math.round((data.totals.exp/data.totals.inc)*100);

        },
        tusviigAvah: function(){
            return{
                tusuv: data.tusuv,
                huwi: data.huwi,
                totalsInc: data.totals.inc,
                totalsExp:data.totals.exp
            }

        },
        addItem: function(type,desc,val){
            var item,id;

            if(data.items[type].length === 0) id=1;
            else {
                id =data.items[type][data.items[type].length-1].id+1;
            }
            if(type==='inc'){
             item=new Income(id,desc,val);
            
            }else {
                // type===exp
                item=new Expense(id,desc,val); 
            }
            data.items[type].push(item);

            return item;
            
        },
        seeData: function(){
            return data;
        }
    };
   
})();

var appController = (function(uiController, financeController) {
    
    var ctrlAddItem=function(){
        var input=uiController.getInput();
        if(input.description!=="" && input.value!==""){
            var item=financeController.addItem(input.type,input.description,input.value);
        // 3. olj awsan ogogdluudee web deeree tohiroh hesegt gargah
        uiController.addListItem(item,input.type);
        uiController.clearFields();
        };  
        // 4. toswiif tootsoolno
        financeController.tusuvTootsooloh();
        // 5. Etssiin uldegsel, tootsoog delgetsend gargana.
        var tusuv=financeController.tusviigAvah();
        //6. Toswiin tootsoog delgetsend gargana
        console.log(tusuv);


       
    
    };

    var setupEventListeners=function(){
        var DOM=uiController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click",function(){
            ctrlAddItem();
        });
        document.addEventListener('keypress',function(event){
         if(event.keyCode===13 || event.which===13){
            ctrlAddItem();
         }
        });
    }
    return {
        init: function(){
            console.log("application started");
            setupEventListeners();
        }
    }
})(uiController, financeController);

appController.init();
