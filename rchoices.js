export class Rchoices {
    constructor (e,ajax=function(){})          {
        this._e = e
        this._ajax = ajax        
    }
    apply(){
        let common = new Common();
        let element = new Element;
        let rch = this;
        let el = bdy.querySelector(this._e);
        common.hide(el);
        let ele = element.create('DIV');
        ele.classList.add('rchoices_list','dis-b');
        let ell = el.options;
        let jsonData = this.getJson(ell);
        this.getBoxListItems(jsonData, ele);
        let a = element.input({'name':'rchoices_input','type':'text'});
        a.style.border = 0;        
        let box = this.getBox();
        box.appendChild(ele);
        box.appendChild(a);
        let dropList = this.getDropList();
        this.getDropListItems(jsonData,dropList)                    
        el.parentNode.insertBefore(box, el);
        el.parentNode.insertBefore(dropList, el);
        a.onkeyup = (e) => {
            this._ajax(e.target,rch);
        }
        rch.remove();
    }
    getList(jsonData,el) {
        let rch = this;
        let element = new Element();
        let dropList = el.parentElement.parentElement.querySelector('.rchoices-droplist');
        dropList.innerHTML = '';
        this.getDropListItems(jsonData,dropList);
        new Common().show(dropList);
        let items = dropList.querySelectorAll('.rchoices_item');
        for(let i=0;i<items.length;i++) {
            items[i].onclick = () => {
                let data = items[i].innerHTML;
                let text = items[i].getAttribute('title');
                let id = items[i].getAttribute('data-value');
                let a =  rch.getItem(data, id,text);
                let btn = this.getDelBtn();
                a.appendChild(btn);
                el.parentElement.querySelector('.rchoices_list').append(a);                
                items[i].parentElement.removeChild(items[i]);
                let o = element.create('OPTION');
                o.value = id;
                o.text = text
                o.selected = true;
                bdy.querySelector(this._e).appendChild(o);
                rch.remove();
            }            
        }
    }
    remove(){
        if(bdy.querySelector('.rchoices_btn')) {
            let x = bdy.querySelectorAll('.rchoices_btn');
            for(let i=0; i<x.length; i++) {
                x[i].onclick = () => {
                    let el = x[i].parentElement;
                    el.parentElement.removeChild(el);
                    let s = bdy.querySelector(this._e);
                    let o = s.options;
                    for(let i=0;i<o.length;i++) {
                        if(o[i].value == el.getAttribute('data-value'))
                            s.remove(i);
                    }
                }
            }
        }
    }
    getBox(){
        let element = new Element;
        let el = element.create('DIV');
        el.classList.add('rchoices-inner');
        return el;
    }
    getDropList(){
        let element = new Element;
        let el = element.create('DIV');
        el.classList.add('rchoices-droplist');
        el.classList.add('dis-n');
        return el;
    }
    getJson(l){
        let j = [];
        for(let i=0;i<l.length;i++) {            
             j[i] = {'name':l[i].text,'id':l[i].value,'text':l[i].text};
        }
        return JSON.parse(JSON.stringify(j));
    }
    getItem(data, id,text){
        let el = new Element().create('DIV');
        el.classList.add('rchoices_item');
        el.innerHTML = data;
        el.setAttribute('data-value',id);
        el.setAttribute('title',text);
        return el;
    }
    getDropListItems(l,ele){
        for(let i=0;i<l.length;i++) {
            if(this.itemExist(l[i].id) == 1) {               
                let el = this.getItem(l[i].name,l[i].id,l[i].text);            
                ele.appendChild(el);
            }
        }
    }
    itemExist(v) {
        let el = bdy.querySelector(this._e);
        let ell = el.options;
        for(let i=0;i<ell.length;i++) {
            if(ell[i].value == v)
                return 0;
        } 
        return 1;       
    }
    getBoxListItems(l,ele){
        let element = new Element;
        for(let i=0;i<l.length;i++) {
            let el = this.getItem(l[i].name, l[i].id,l[i].text);
            let btn = this.getDelBtn();
            btn.onclick = () => {
                    //remove element from div.
            }            
            el.appendChild(btn);
            ele.appendChild(el);
            return ele;
        }
    }
    getDelBtn() {
        let a = new Element().create('A');
        a.text = "X";
        a.href ="javascript:void(0)";
        a.classList.add('rchoices_btn');           
        return a;  
    }
}
