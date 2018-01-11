$(function () {
    let qipan = $('.qipan'),
        flag = true,
        hei = {},
        bai = {},
        blank = {},
        ai = true;
    for(let i = 0;i < 15;i++){
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for(let j = 0;j < 15;j++){
            blank[i+"_"+j] = true;
            $('<span>')
                .appendTo(qipan)
                .addClass('qizi')
                .attr('id',i+"_"+j)
                .data('pos',{x:i,y:j})
        }
    }
    qipan.on('click','.qizi',function () {
        if($(this).hasClass('hei') || $(this).is('.bai')){
            return;
        }
        let  data = $(this).data('pos');
        delete blank[data.x+"_"+data.y];
        if(flag){
            $(this).addClass('hei');
            hei[data.x+"_"+data.y] = true;
            if(isSuccess(data, hei) >=5){
                console.log('hei');
                qipan.off();
            }
            if(ai){
                let pos = position();
                $('#' + pos.x+"_"+pos.y).addClass('bai');
                bai[pos.x + "_" + pos.y] = true;
                delete blank[pos.x+"_"+pos.y];
                if(isSuccess(pos, bai) >= 5){
                    console.log('bai');
                    qipan.off();
                }
                return;
            }
        }else {
            $(this).addClass('bai');
            bai[data.x+"_"+data.y] = true;
            if(isSuccess(data,bai) >=5){
                console.log('bai');
                qipan.off();
            }
        }
        flag = !flag;
    });

    //位置
    function position() {
        let score1 = 0 , score2 = 0 , pos1 = null , pos2 = null;
        for(let i in blank){
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if(isSuccess(obj,hei) > score1){
                score1 = isSuccess(obj,hei);
                pos1 = obj;
            }
            if(isSuccess(obj,bai) > score2){
                score2 = isSuccess(obj,bai);
                pos2 = obj;
            }
        }
        return score2 >= score1 ? pos2 : pos1;
    }
    function isSuccess(pos,obj) {
        let hen = 1 , shu = 1 , yx = 1 , zx = 1,
            x = pos.x , y = pos.y;
        while(obj[x+"_"+(++y)]){
            hen++;
        }
        y = pos.y;
        while(obj[x+"_"+(--y)]){
            hen++;
        }
        x = pos.x , y = pos.y;
        while(obj[(++x)+"_"+y]){
            shu++;
        }
        x = pos.x;
        while(obj[(--x)+"_"+y]){
            shu++;
        }
        x = pos.x;
        while (obj[(++x) + "_" + (++y)]) {
            zx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(--x) + "_" + (--y)]) {
            zx++;
        }

        x = pos.x , y = pos.y;

        while (obj[(--x) + "_" + (++y)]) {
            yx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(++x) + "_" + (--y)]) {
            yx++;
        }

        return  Math.max(hen,shu,zx,yx);
    }
})