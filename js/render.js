//<tr>
//<td>1</td>
//<td>1</td>
//<td>1</td>
//</tr>
M.AutoInit();

function MakeUpTable(_y,_month,_biweek){
    let Temp=document.createElement("tr");
    Temp.innerHTML='<td>'+_y+'</td>'
                    +'<td>'+_month+'</td>'
                    +'<td>'+_biweek+'</td>'
    return Temp;
}

function AddTableElement(_y,_month,_biweek){
    let temp=MakeUpTable(_y,_month,_biweek);
    tbody.appendChild(temp);
}

/**
 * powered by Fungus-Light
 * https://github.com/Fungus-Light
 */