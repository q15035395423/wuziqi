$(function () {
    let qipan = $('.qipan'),
        flag = true,
        hei = {},
        bai = {};
    for (let i = 0; i < 15; i++) {
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for (let j = 0; j < 15; j++) {
            $('<span>')
                .appendTo(qipan)
                .addClass('qizi')
                .data('pos', {x: i, y: j})
        }
    }

    qipan.on('click', '.qizi', function () {
        if ($(this).hasClass('hei') || $(this).is('.bai')) {
            return;
        }
        let data = $(this).data('pos');
        if (flag) {
            $(this).addClass('hei');
            hei[data.x + "_" + data.y] = true;
            if (isSuccess(data, hei) >= 5) {
                console.log('hei');
                qipan.off();
            }
        } else {
            $(this).addClass('bai');
            bai[data.x + "_" + data.y] = true;
            if (isSuccess(data, bai) >= 5) {
                console.log('bai');
                qipan.off();
            }
        }
        flag = !flag;
    });


    function isSuccess(pos, obj) {
        // {x:7,y:7} hei
        let hen = 1, shu = 1, yx = 1, zx = 1,
            x = pos.x, y = pos.y;
        while (obj[x + "_" + (++y)]) {
            hen++;
        }
        y = pos.y;
        while (obj[x + "_" + (--y)]) {
            hen++;
        }

         x = pos.x , y = pos.y ;
        while (obj[(++x) + "_" + y]) {

            shu++;
        }
        x = pos.x;
        while (obj[(--x) + "_" + y]) {
            shu++;
        }

        x = pos.x , y = pos.y;

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
});