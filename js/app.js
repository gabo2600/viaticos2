

//inputs

const inDate = document.getElementById("in_date");
const inTicket = document.getElementById("in_ticket");
const inSerie = document.getElementById("in_pr");
const inRuta = document.getElementById("in_ruta");
const inObs = document.getElementById("in_obs");

const btnGenReport = document.getElementById("btnRep");
const btnCls = document.getElementById("btnClear");
const btnShr = document.getElementById("btnShr");
const send = document.getElementById("btnAdd");



//Toast
const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("toast"));
const tab = document.getElementById("entry_table");


//Total del dinero de la solicitus, se saca sumando el precio de cada parada en la tabla, se hace la sumatoria en la funcion create row
let total = 0;
//Fecha de hoy
let curDate = "";
//DATA
/*----------------------------------------------------------------------------------------------------*/
class EntryClass {
    constructor(date, ticket, serie, ruta, obs) {
        this.d = date;
        this.t = ticket;
        this.s = serie;
        this.r = ruta;
        this.o = obs;
    }
}

//Stop class
class sc {
    constructor(desc, price) {
        this.desc = desc;
        this.price = price;
    }

}

//entradas
let entries = [];

const rutas = [
    {
        place: "HUIXQUILUCAN",
        stops: [
            new sc("ADMINISTRATIVO - ZAPATA", 14),
            new sc("ZAPATA - LA MARQUESA", 25),
            new sc("LA MARQUESA - CENTRO HUIXQUILUCAN", 15),
            new sc("CENTRO DE HUIXQUILUCAN - LA MARQUESA", 15),
            new sc("LA MARQUESA - ZAPATA", 25),
            new sc("ZAPATA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "ACULCO",
        stops: [
            new sc("ADMINISTRATIVO - PRI", 14),
            new sc("PRI - IXTLAHUACA", 48),
            new sc("IXTLAHUCA - TERMINAL ATLACOMULCO", 40),
            new sc("TERMINAL DE ATLACOMULCO - ACAMBAY", 25),
            new sc("ACAMBAY - DESVIACIÓN ACULCO", 32),
            new sc("DESVIACIÓN ACULCO - CENTRO ACULCO", 10),
            new sc("CENTRO ACULCO - JUZGADOS ACULCO", 50),
            new sc("JUZGADOS ACULCO - CENTRO ACULCO", 50),
            new sc("CENTRO ACULCO - DESVIACIÓN ACULCO", 10),
            new sc("DESVIACIÓN ACULCO - ACAMBAY", 32),
            new sc("ACAMBAY - TERMINAL ATLACOMULCO", 25),
            new sc("TERMINAL DE ATLACOMULCO - IXTLAHUACA", 40),
            new sc("IXTLAHUACA - PRI", 48),
            new sc("PRI - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "ARCHIVO GENERAL SAN PABLO",
        stops: [
            new sc("ADMINISTRATIVO - SAN PABLO AUTOPAN", 14),
            new sc("SAN PABLO AUTOPAN - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "LERMA",
        stops: [
            new sc("ADMINISTRATIVO - ZAPATA", 14),
            new sc("ZAPATA - JUZGADOS LERMA", 14),
            new sc("JUZGADOS LERMA - ZAPATA", 14),
            new sc("ZAPATA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "METEPEC",
        stops: [
            new sc("ADMINISTRATIVO - CRISA", 14),
            new sc("CRISA - JUZGADOS METEPEC", 14),
            new sc("JUZGADOS METEPEC - CRISA", 14),
            new sc("CRISA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "SANTIAGO TIANGUISTENGO",
        stops: [
            new sc("ADMINISTRATIVO - LA JET", 14),
            new sc("LA JET- SANTIAGO TIANGUISTENCO", 35),
            new sc("SANTIAGO TIANGUISTENCO - JUZGADOS DE SANTIAGO", 15),
            new sc("JUZGADOS DE SANTIAGO - SANTIAGO TIANGUISTENCO", 15),
            new sc("SANTIAGO TIANGUISTENCO - LA JET", 35),
            new sc("LA JET - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "ALMOLOYA DE JUÁREZ",
        stops: [
            new sc("ADMINISTRATIVO - ALMOLOYA", 15),
            new sc("ALMOLOYA - ADMINISTRATIVO", 15)
        ]
    },
    {
        place: "ZINACANTEPEC",
        stops: [
            new sc("ADMINISTRATIVO - ZINACANTEPEC", 15),
            new sc("ZINACANTEPEC - TUTELAR", 15),
            new sc("TUTELAR - ZINACANTEPEC", 15),
            new sc("ZINACANTEPEC - ADMINISTRATIVO", 15)
        ]
    },
    {
        place: "ATLACOMULCO	",
        stops: [
            new sc("ADMINISTRATIVO - PRI", 14),
            new sc("PRI - IXTLAHUACA", 48),
            new sc("IXTLAHUACA - TERMINAL ATLACOMULCO", 40),
            new sc("TERMINAL DE ATLACOMULCO - IXTLAHUACA", 40),
            new sc("IXTLAHUACA - PRI", 48),
            new sc("PRI - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "IXTLAHUACA",
        stops: [
            new sc("ADMINISTRATIVO - PRI", 14),
            new sc("PRI - IXTLAHUACA", 48),
            new sc("JUZGADOS IXTLAHUACA - TERMINAL DE IXTLAHUACA", 12),
            new sc("IXTLAHUACA - PRI", 48),
            new sc("PRI - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "VALLE DE BRAVO",
        stops: [
            new sc("ADMINISTRATIVO - TERMINAL TOLUCA", 14),
            new sc("TERMINAL TOLUCA - VALLE DE BRAVO", 153),
            new sc("VALLE DE BRAVO - TERMINAL DE TOLUCA", 155),
            new sc("TERMINAL TOLUCA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "TENANCINGO",
        stops: [
            new sc("ADMINISTRATIVO - TERMINAL TOLUCA", 14),
            new sc("TERMINAL TOLUCA - TENANCINGO CENTRO", 55),
            new sc("TENANCINGO CENTRO - JUZGADOS TENANCINGO", 50),
            new sc("JUZGADOS TENANCINGO - TENANCINGO CENTRO", 50),
            new sc("TENANCINGO CENTRO - TERMINAL TOLUCA", 55),
            new sc("COMONFORT - ADMINISTRATIVO", 14),
        ]
    },
    {
        place: "TENANGO",
        stops: [
            new sc("ADMINISTRATIVO - CRISA", 14),
            new sc("CRISA - TENANGO DEL VALLE", 27),
            new sc("TENANGO DEL VALLE- JUZGADOS TENANGO", 50),
            new sc("JUZGADOS TENANGO - TENANGO DEL VALLE", 50),
            new sc("TENANGO DEL VALLE - CRISA", 27),
            new sc("CRISA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "EL ORO",
        stops: [
            new sc("ADMINISTRATIVO - PRI", 14),
            new sc("PRI - TERMINAL IXTLAHUACA", 48),
            new sc("TERMINAL IXTLAHUACA - TERMINAL ATLACOMULCO", 40),
            new sc("TERMINAL ATLACOMULCO - EL ORO", 42),
            new sc("EL ORO - TERMINAL ATLACOMULCO", 42),
            new sc("TERMINAL ATLACOMULCO - TERMINAL IXTLAHUACA", 40),
            new sc("TERMINAL IXTLAHUACA - PRI", 48),
            new sc("PRI - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "JILOTEPEC",
        stops: [
            new sc("ADMISITRATIVO - PRI", 14),
            new sc("PRI - TERMINAL JILOTEPEC", 192),
            new sc("TERMINAL JILOTEPEC - JUZGADOS JILOTEPEC", 60),
            new sc("JUZGADOS JILOTEPEC - TERMINAL JILOTEPEC", 60),
            new sc("TERMINAL JILOTEPEC - PRI", 192),
            new sc("PRI - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "UNIDAD DEPORTIVA",
        stops: [
            new sc("ADMINISTRATIVO - UNIDAD DEPORTIVA", 14),
            new sc("UNIDAD DEPORTIVA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "XONACATLÁN",
        stops: [
            new sc("ADMINISTRATIVO - PLAZA SANTIN", 14),
            new sc("PLAZA SANTIN - XONACATLÁN", 15),
            new sc("XONACATLÁN - PLAZA SANTIN", 15),
            new sc("PLAZA SANTIN - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "TEMASCALTEPEC",
        stops: [
            new sc("ADMINISTRATIVO - TERMINAL TOLUCA", 14),
            new sc("TERMINAL TOLUCA - TEMASCALTEPEC", 129),
            new sc("TEMASCALTEPEC - TERMINAL TOLUCA", 129),
            new sc("TERMINAL TOLUCA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "IXTAPAN DE LA SAL",
        stops: [
            new sc("ADMINISTRATIVO - TERMINAL TOLUCA", 14),
            new sc("TERMINAL TOLUCA - TERMINAL IXTAPAN", 98),
            new sc("TERMINAL IXTAPAN - TERMINAL TOLUCA", 98),
            new sc("TERMINAL TOLUCA - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "ACAMBAY",
        stops: [
            new sc("ADMINISTRATIVO - PRI", 14),
            new sc("PRI - IXTLAHUACA", 48),
            new sc("IXTLAHUCA - TERMINAL ATLACOMULCO", 40),
            new sc("TERMINAL DE ATLACOMULCO - ACAMBAY", 32),
            new sc("ACAMBAY - JUZGADOS ACAMBAY", 0),
            new sc("JUZGADOS ACAMBAY - ACAMBAY", 0),
            new sc("ACAMBAY - TERMINAL ATLACOMULCO", 32),
            new sc("TERMINAL DE ATLACOMULCO - IXTLAHUACA", 40),
            new sc("IXTLAHUACA - PRI", 48),
            new sc("PRI - ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "XALATLACO",
        stops: [
            new sc("ADMINISTRATIVO - LA JET", 14),
            new sc("LA JET - SANTIAGO TIANGISTENCO", 35),
            new sc("SANTIAGO TIANGUISTENCO - XALATLACO CENTRO", 14),
            new sc("XALATLACO CENTRO - JUZGADOS XALATLACO", 60),
            new sc("JUZGADOS XALATLACO - XALATLACO CENTRO", 60),
            new sc("XALATLACO CENTRO - SANTIAGO TIANGUISTENCO", 15),
            new sc("SANTIAGO TIANGUISTENCO - LA JET", 25),
            new sc("LA JET- ADMINISTRATIVO", 14)
        ]
    },
    {
        place: "CIUDAD MUJERES",
        stops: [
            new sc("ADMINISTRATIVO - ZAPATA", 14),
            new sc("ZAPATA - CIUDAD MUJERES", 50),
            new sc("CIUDAD MUJERES - ZAPATA", 50),
            new sc("ZAPATA - ADMINISTRATIVO", 14),
        ]
    },
    {
        place: "Nicolas San Juan",
        stops: [
            new sc("ADMINISTRATIVO - PRI", 14),
            new sc("PRI - ADMINISTRATIVO", 14),
        ]
    },
    {
        place: "Conalep Oficinas centrales",
        stops: [
            new sc("ADMINISTRATIVO - AVENIDA ALFREDO DEL MAZO", 14),
            new sc("AVENIDA ALFREDO DEL MAZO - ADMINISTRATIVO", 14),
        ]
    },
    {
        place: "Secretaria del bienestar(Telecomm)",
        stops: [
            new sc("TOLUCA CENTRO - PASEO TOLLOCAN", 14),
            new sc("PASEO TOLLOCAN - TOLUCA CENTRO", 14),
        ]
    },
];

/*----------------------------------------------------------------------------------------------------*/
//Actions
/*----------------------------------------------------------------------------------------------------*/

//Funciones prototipos
let updateTable = () => { }
let createRow = (Data) => { }
let createTd = (txt,rowspan,colspan) => { }
let loadparam = async()=>{}
let genUrl = async()=>{}
let clearData = ()=>{}
let exportarTablaHTML = ()=>{}

let editHTMLCell = (element)=>{}
let editHTMLCellDone = (element,input)=>{}


updateTable = () => {
    tab.innerHTML = `<tr>
             <th>Fecha</th>
             <th>Ticket</th>
             <th>Serie</th>
             <th colspan="4">Descripcion de ruta</th>
             <th>Observaciones</th>
             <th>Importe Total</th>
        </tr>`;

    //si no hay entradas para la ejecucion
    if (entries.length === 0)
        return;
    let entriesTmp = [...entries];
    let tmpArray;
    let dateTmp;

    //se resetea le total de viatico
    total = 0;

    //Se separan y dibujan por fecha en la tabla
    do {
        tmpArray = [];
        dateTmp = entriesTmp[0].d;
        tmpArray = entriesTmp.filter(en => en.d === dateTmp);
        entriesTmp = entriesTmp.filter(en => en.d != dateTmp);
        //las entradas de un dia estan en el arreglo tmpArray

        createRow(tmpArray);
        //Se añade la fila a la tabla

    } while (entriesTmp.length > 0);

    //Se ponen los totales al final de la tabla
    let totalRow = document.createElement("tr");
    let totalTh = document.createElement("th");

    totalTh.setAttribute("colspan",8);
    totalTh.setAttribute("align","left");
    totalTh.innerText = "Total";
    totalRow.appendChild(totalTh);

    totalTh = document.createElement("th");
    totalTh.setAttribute("align","left");
    totalTh.innerText = "$"+total+".00";
    totalTh.onclick = ()=>editHTMLCell(totalTh);
    totalRow.appendChild(totalTh);


    tab.appendChild(totalRow);
}


createRow = (Data) => {
    //Variables
    //Fila de la tabla a añadir
    let tableRow =document.createElement("tr");
    //espacios totales a dejar en rowspans para el campo fecha en la fila
    let totalRowspansXday = 0;
    //indices
    //Indice del Total de filas entre todos los registros
    let i = 0;
    //Indice de el registro cuyas rutas(stops) estan siendo dibujadas
    let j = 0;
    /*Registra el total de stops ya pintadas...
        -si de la primera ruta son 4 stops esto deberia ser 4
        esto para que al dibujar el siguente registro esta bariable se reste de i para que la siguente
        tanda de stoips se empiece a dibujar desde cero respetando los indices del arreglo stops de cada ruta
        sin alterar el indice i
        algo como rutas[Data[j].r].stops[i-k].desc...
    */
    let k = 0;
    //Indice que se usa solo si hay varios tickets en una sola ruta, para dividir la celda de series y tickets y pintarla en multiples pasos del arreglo
    let l = 1;

    //rutasActuales representa el numero de rutas a dibujar por registro
    let rutasActuales = 0;

    //se sacan los espacios totales a dejar
    for (i = 0; i <= Data.length - 1; i++) {
        totalRowspansXday += rutas[Data[i].r].stops.length;
    }
    //fecha con todos los raw spans del dia
    tableRow.appendChild(createTd(Data[0].d,totalRowspansXday,1));

    //Se dibula el total de filas
    for (i = 0; i < totalRowspansXday; i++) {

        /*Si la fila actual es mayor al numero de stops del registro actual(menos los ya dibujados de previos registros)
        se incrementa j para dibujar el siguente registro y k se le suman el numero de registros ya dibujados*/
        if (i - k >= rutas[Data[j].r].stops.length) {
            k += rutas[Data[j].r].stops.length;
            j++;
        }
        rutasActuales = rutas[Data[j].r].stops.length;

        //incluye varios tickets
        //Si cuenta con la funcion trim es uina cadena, sino es un arreglo
        if (Data[j].t.trim ){
            console.log("Condumio")
            if (Data[j].t.includes(",") && Data[j].t.split(",").length < rutasActuales){
                Data[j].t = Data[j].t.split(",");
                Data[j].s = Data[j].s.split(",");
            }
            console.log(Data[j].s.length);
            console.log(Data[j].s);
        }

        //Solo dibuja la primera linea de la ruta con los datos de la impresora, ticket. etc
        if ((i - k) < l) {           
            //Ticket & Serie
            //Si es un arreglo que se pinte todo de usa vez
            if (!Data[j].t.trim && Data[j].length>l){
                tableRow.appendChild(createTd(Data[j].t[l],rutasActuales-(Data[j].length-l),1));
                tableRow.appendChild(createTd(Data[j].s[l],rutasActuales-(Data[j].length-l),1));
                l++;
            }else{
                tableRow.appendChild(createTd(Data[j].t,  rutasActuales,  1));
                tableRow.appendChild(createTd(Data[j].s,  rutasActuales  ,1));
            }
        }
        //descripcion de ruta
        tableRow.appendChild(createTd(rutas[Data[j].r].stops[i - k].desc,1,4));
        //Si el numero de fila es menor al numero de registro actual o igual se dibuja
        if ((i - k) < 1) {
            //observaciones
            tableRow.appendChild(createTd(Data[j].o,rutasActuales,1));
        }
        //importe total
        tableRow.appendChild(createTd("$"+rutas[Data[j].r].stops[i - k].price+".00",1,1));
        total += rutas[Data[j].r].stops[i - k].price;

        //Se añade la fila a la tabla
        tab.appendChild(tableRow);
        //Se crea una nueva columna tras meter la anterior
        tableRow = document.createElement("tr");
    }
}

createTd = (txt,rowspan,colspan) => {
    let td = document.createElement("td");
    //Si el atributo es mayor a 1 se añade
    if (rowspan>1)
        td.setAttribute("rowspan", rowspan);
    if (colspan>1)
        td.setAttribute("colspan", colspan);
    td.innerText = txt;
    td.onclick = ()=>editHTMLCell(td);
    return td;
}

exportarTablaHTML = async () => {
    try {
        // 1. Cargar la plantilla original
        const respuesta = await fetch("./plantilla/viatico.xlsx");

        if (!respuesta.ok) {
            throw new Error(
                `Error al cargar plantilla: ${respuesta.status}`
            );
        }

        const archivo = await respuesta.arrayBuffer();
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.load(archivo);

        const worksheet = workbook.getWorksheet("viatico");

        if (!worksheet) {
            throw new Error("No existe la hoja viatico");
        }

        // 2. Obtener las filas de la tabla HTML.
        // La primera fila contiene los encabezados.
        const filasHTML = [...tab.rows].slice(1);

        if (filasHTML.length === 0) {
            throw new Error("La tabla no contiene datos");
        }

        const filaInicial = 11;
        const columnaInicial = 1; // A

        // Mapa de celdas ocupadas por rowspan/colspan.
        const ocupadas = new Map();

        function estaOcupada(fila, columna) {
            return ocupadas.has(`${fila},${columna}`);
        }

        function marcarOcupadas(fila, columna, alto, ancho) {
            for (let f = fila; f < fila + alto; f++) {
                for (let c = columna; c < columna + ancho; c++) {
                    ocupadas.set(`${f},${c}`, true);
                }
            }
        }

        // 3. Copiar los datos de cada fila HTML.
        for (let f = 0; f < filasHTML.length; f++) {
            const filaHTML = filasHTML[f];
            const filaExcel = filaInicial + f;

            //Si es la ultima fila
            const esFilaTotales = filaHTML.querySelector("th") !== null;


            // Si superamos las filas preparadas de la plantilla,
            // copiar el estilo de la fila 11.
            if (filaExcel > 35) {
                const filaModelo = worksheet.getRow(11);
                const filaNueva = worksheet.getRow(filaExcel);

                filaNueva.height = filaModelo.height;

                for (let c = 1; c <= 9; c++) {
                    filaNueva.getCell(c).style =
                        structuredClone(filaModelo.getCell(c).style);
                }
            }

            let columna = columnaInicial;

            for (const celdaHTML of [...filaHTML.cells]) {
                // Saltar columnas ocupadas por combinaciones anteriores.
                while (estaOcupada(filaExcel, columna)) {
                    columna++;
                }

                const alto = celdaHTML.rowSpan || 1;
                const ancho = celdaHTML.colSpan || 1;

                const filaFinal = filaExcel + alto - 1;
                const columnaFinal = columna + ancho - 1;

                if (columnaFinal > 9) {
                    throw new Error(
                        `La tabla excede la columna I en la fila ${f + 1}`
                    );
                }

                if (filaFinal > 1048576) {
                    throw new Error("Se excedió el límite de filas de Excel");
                }

                const celdaExcel = worksheet.getCell(
                    filaExcel,
                    columna
                );

                // Copiar el contenido visible de la celda.
                celdaExcel.value = celdaHTML.textContent.trim();

                celdaExcel.alignment = {
                    vertical: "middle",
                    horizontal: "left",
                    wrapText: true
                };

                celdaExcel.border = {
                    top: { style: "thin"},
                    bottom: { style: "thin"},
                    left: { style: "thin"},
                    right: { style: "thin"}
                };

                celdaExcel.font = {
                    name: "Calibri",
                    size: 11,
                    color: { argb: "000" }
                };
                //Si es un numero que se remplace el texto por un numero tipo moneda en la tabla
                if (celdaExcel.value.includes("$")){

                    celdaExcel.value = parseFloat(celdaExcel.value.replace("$",""));
                    celdaExcel.numFmt = "$0.00";
                    //Si es la celda del total, se mete formula sumatoria
                    if (esFilaTotales)
                        celdaExcel.value = {formula:"SUM(I11:I"+(9+filasHTML.length)+")"};                        
                }

                if (esFilaTotales) { //Si es la de totales que se pinte de
                    celdaExcel.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "#2e59a8" }
                    };
                }

                // Reproducir rowspan y colspan en Excel.
                if (alto > 1 || ancho > 1) {
                    worksheet.mergeCells(
                        filaExcel,
                        columna,
                        filaFinal,
                        columnaFinal
                    );
                }

                marcarOcupadas(
                    filaExcel,
                    columna,
                    alto,
                    ancho
                );

                columna += ancho;
            }
            //Fecha del reporte
            worksheet.getCell("B6").value = curDate;
        }

        // 4. Generar y descargar el nuevo archivo.
        const buffer = await workbook.xlsx.writeBuffer();

        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");

        enlace.href = url;
        enlace.download = "Solicitud de viaticos Gabriel Velez "+curDate+".xlsx";
        enlace.click();

        setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (error) {
        console.error("Error al exportar:", error);
        alert(`No se pudo exportar el Excel: ${error.message}`);
    }
}


//send
send.addEventListener("click", () => {
    let en_date = new Date(inDate.value + "T00:00:00");
    entries.push(
        new EntryClass(
            en_date.toLocaleDateString("es-ES"),
            inTicket.value || "N/A",
            inSerie.value,
            parseInt(inRuta.value),
            inObs.value || "Sin Observaciones"
        )
    );
    //se guardan los datos en el almacenamiento local
    localStorage.setItem("entries", JSON.stringify(entries));
    updateTable();
});

init = async() => {
    //Add routes
    inRuta.innerHTML = "";
    for (let i = 0; i <= rutas.length - 1; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = rutas[i].place;
        inRuta.appendChild(opt);
    }
    //se recuperan los datos del almacenamiento local
    const datos = localStorage.getItem("entries");
    if (datos) {
        entries = JSON.parse(datos);
    }
    await loadparam();

    updateTable();
    
    const fecha = new Date();

    curDate = [
        String(fecha.getDate()).padStart(2, "0"),
        String(fecha.getMonth() + 1).padStart(2, "0"),
        fecha.getFullYear()
    ].join("-");

    if (inDate.value == "")
        inDate.value = [
            fecha.getFullYear(),
            String(fecha.getMonth() + 1).padStart(2, "0"),
            String(fecha.getDate()).padStart(2, "0"),
        ].join("-");

}

loadparam = async()=>{
    //GEt param
    const urlParam = new URLSearchParams(window.location.search);
    let param = urlParam.get("ref");

    if (param==null)
        return ;

    //decode
    if (!/^[A-Za-z0-9_-]+$/.test(param)) {
      throw new Error("El enlace tiene un formato inválido.");
    }

    const base64 = param
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const binario = atob(
      base64 + "=".repeat((4 - base64.length % 4) % 4)
    );

    let bytes = Uint8Array.from(
      binario,
      caracter => caracter.charCodeAt(0)
    );


    //Decompress it
    const stream = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream("deflate"));
    let jsonEntries =  await new Response(stream).text();
    entries = JSON.parse(jsonEntries);
    
    localStorage.setItem("entries", JSON.stringify(entries));
    window.location.replace(location.origin + location.pathname)
}

genUrl = async()=>{
    jsonEntries = JSON.stringify(entries);
    //Comprime el texto
    const bytes = new TextEncoder().encode(jsonEntries);

    const stream = new Blob([bytes])
        .stream()
        .pipeThrough(new CompressionStream("deflate"));

    let finalBytes = new Uint8Array(
        await new Response(stream).arrayBuffer()
    );
    //Codifica el texto
    let binario = "";

    for (const byte of finalBytes) {
      binario += String.fromCharCode(byte);
    }

    let encoded = btoa(binario)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

    //Arma la url
    navigator.clipboard.writeText(location.origin + location.pathname + "?ref=" + encoded);

    //Muestra el toast
    toast.show();

    setTimeout(()=>{toast.hide()},2500);
}

clearData = ()=>{
    entries = [];
    localStorage.setItem("entries", JSON.stringify(entries));
    updateTable();
    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("Modal"));
    modal.hide();
}

editHTMLCell = (element)=>{
    if (element.children.length !==0){
        return 0;
    }

    const val = element.innerText.trim();
    const inTd = document.createElement("input");

    inTd.value = val;
    inTd.setAttribute("type","text");
    inTd.setAttribute("class","form-control");
    element.innerHTML = "";

    element.appendChild(inTd);
    inTd.focus();
    //SE aaden los eventos... focus out y presionar enter
    inTd.addEventListener("focusout",()=>editHTMLCellDone(element,inTd));
    inTd.addEventListener("keydown",(e)=>{
        if (e.key === "Enter")
            editHTMLCellDone(element,inTd)}
    );
}

editHTMLCellDone = (element,input)=>{
    const val = input.value;
    element.innerHTML = val;
}

//Botones
btnShr.onclick = genUrl;
btnCls.onclick = clearData;
btnGenReport.onclick = exportarTablaHTML;

init();