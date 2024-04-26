const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

    var sno = 0;
    var tbody = document.getElementById('tbody1');

    function AddItemToTable (Latitude, Longitude, Place_Details, Place_Name, Timestamp){
        let trow = document.createElement("tr");
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');

        td1.textContent = ++sno;
        td2.textContent = Latitude;
        td3.textContent = Longitude;
        td4.textContent = Place_Details;
        td5.textContent = Place_Name;
        td6.textContent = Timestamp;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3); 
        trow.appendChild(td4);
        trow.appendChild(td5);
        trow.appendChild(td6);

        tbody.appendChild(trow);
    }

    function AddAllItemsToTable(leadArray){
        sno=0;
        tbody.innerHTML=" ";
        leadArray.forEach (element => {
            AddItemToTable(element.latitude, element.longitude, element.placeDetails, element.placeName, element.timestamp.toDate());
        });
    }

    //Import&Config
    import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  
    const firebaseConfig = {
        apiKey: "AIzaSyAcFvSC-WqqMArLdvGge42C8oQH7FS55uw",
        authDomain: "leadcentral-762c7.firebaseapp.com",
        databaseURL: "https://leadcentral-762c7-default-rtdb.firebaseio.com",
        projectId: "leadcentral-762c7",
        storageBucket: "leadcentral-762c7.appspot.com",
        messagingSenderId: "675443914156",
        appId: "1:675443914156:web:d4fa906578cb70cc043609"
  };

    const app = initializeApp(firebaseConfig);

    import { 
        getFirestore, doc, getDoc, getDocs, onSnapshot, collection
    }
    from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
    const db = getFirestore();

    //fetching data
    async function GetAllDataOnce()
    {
        const querySnapshot = await getDocs(collection(db,"leads"))
        var arr = [];      
        querySnapshot.forEach(doc => {
            arr.push(doc.data());
        });
        AddAllItemsToTable(arr);
    }

    async function GetAllDataRealtime(){
        const dbRef = collection(db,"leads");
        
    onSnapshot(dbRef,(querySnapshot)=>{
        var arr = [];
        querySnapshot.forEach(doc => {
            arr.push(doc.data());
        });
        AddAllItemsToTable(arr);
    })
}

window.onload = GetAllDataRealtime;