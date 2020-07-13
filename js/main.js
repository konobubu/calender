'use strict'

{
    const dat = new Date();
    let month = dat.getMonth();
    let year = dat.getFullYear();
    // let createCount = 1;

    function getCalenderBody(){
        const dates = [];
        const lastDate = new Date(year, month + 1, 0).getDate(); //5月の最後の日にち
        for(let i = 1; i <= lastDate; i++){
            dates.push(
                {
                    date: i,
                    isToday: false,
                    isDisable: false
                }
            );
        }

        if(year === dat.getFullYear() && month ===dat.getMonth()){
            dates[dat.getDate() - 1].isToday = true;
        } 
        return dates;
    }

    function getCalenderHead(){
        const dates = [];
        const firstDay = new Date(year, month , 1).getDay(); //今月の最初の曜日(値) //5
        const prevLastdate = new Date(year, month, 0).getDate(); //前月の最後の日にち //30
        const prevLastday = new Date(year, month, 0).getDay(); //前月の最後の曜日
        console.log(prevLastday);
        console.log(prevLastdate);

        // console.log(prevLastday);
        // console.log(firstDay);
        for(let i = 0; i < firstDay; i++){
            // console.log(prevLastday - i);
            dates.push(
                {
                    date: prevLastdate - prevLastday + i,
                    isToday: false,
                    isDisable: true,
                }
            ); //30,29,28,27,26
        }

        return dates;
    }

    function getCalenderTail(){
        const dates = [];
        const firstDay = new Date(year, month, 1).getDay(); //今月の最初の曜日(値) //5   
        const Lastday = new Date(year, month + 1, 0).getDay(); //今月の最後の曜日 //4
        // var date = new Date(year, month)
        // date.setDate(1);
        // date.setMonth(date.getMonth() + 1);
        // date.setDate(0);
        // const prevLastday = date.getDay();
        const tailCount = 6 - Lastday; //2

        for(let i = 1; i < tailCount + 1; i++){
            dates.push(
                {
                    date: i,
                    isToday: false,
                    isDisable: true,
                }
            );
        } 
        return dates;
    }

    function nextMonth(){
        const next = document.getElementById('next');
        next.addEventListener('click', function(){
            month += 1;
            createCalender();
        }, false)
    }

    function prevMonth(){
        const prev = document.getElementById('prev');
        prev.addEventListener('click', function(){
            month -= 1;
            createCalender();
        }, false)
    }

    function moveDate(){
        if(month > 11){
            month = 0;
            year += 1;
        }else if (month < 0) {
            month = 11;
            year -= 1;
        }
    }

    function changeTitle(){
        let title = document.getElementById('title');
        title.textContent = `${year}年${month + 1}月`;
    }

    function toToday(){
        let today = document.getElementById('today');
        today.addEventListener('click', function(){
            year = dat.getFullYear();
            month = dat.getMonth();
            createCalender();
        })
    }

    function createCalender(){
        const tbody = document.querySelector('tbody'); //週ごとに行を追加
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }

        let dates = [
            ...getCalenderHead(),
            ...getCalenderBody(),
            ...getCalenderTail(),
        ];
        let weeks = []; 
        let weekCount = dates.length / 7;

        for(let i = 0; i < weekCount; i++){
            weeks.push(dates.splice(0, 7)); //元の配列は破壊されない
        }
    
        weeks.forEach(function(week, index, array){
            // console.log(week);
            // console.log("aaaa")
            // if(createCount > 2){
            //     const removeTr = document.querySelectorAll('tbody tr')
            //     // removeTr.removeChild(tr); 
            //     removeTr.parentNode.removeChild(removeTr);
            // }

            const tr = document.createElement('tr');
            // const tbody = document.querySelector('tbody'); //週ごとに行を追加
            tbody.appendChild(tr);

            week.forEach(function(dates, index, array){
                const td = document.createElement('td');
                td.textContent = dates.date
                if(dates.isDisable){
                    td.classList.add('disable');
                }
                if(dates.isToday){
                    td.classList.add('today');
                }
                tr.appendChild(td); 
            })

        })

        moveDate();
        changeTitle();
    }

    createCalender();
    nextMonth();
    prevMonth();
    toToday();
}

// const prevLastday = new Date(year, month + 1, 0).getDay(); //4月の最後の曜日 //4