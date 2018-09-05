$(function () {
    let activeTab = 'short';
    let shortTabEl = $('#url-short-tab');
    let rollbackTabEl = $('#url-rollback-tab');
    let input = $('#url-input');
    let btn = $('#url-btn');
    let resultEl = $('#url-result');

    let els = [shortTabEl, rollbackTabEl];
    els.forEach(function (el) {
        el.click(function (e) {
            els.forEach(function (el) {
                el.removeClass('active');
            });
            el.addClass('active');
            if (el.hasClass('short')) {
                btn.val('缩短网址');
            } else {
                btn.val('还原网址');
            }
        });
    });

    btn.click(function (e) {
        let url = input.val();
        if (!url) {
            return resultEl.html('<span style="color: #f05230">不能为空</span>');
        } else if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
            return resultEl.html('<span style="color: #f05230">格式不正确，请加上协议</span>');
        }

        if (shortTabEl.hasClass('active')) {
            $.ajax({
                type: 'POST',
                url: 'https://url.api.zf.ink/urls',
                data: {
                    url: url,
                },
                json: true,
                success: function (result) {
                    resultEl.html('结果：' + result.shortUrl);
                },
                error: function (result) {
                    resultEl.html('结果：获取失败，请稍候重试');
                }
            })
        } else {
            let id = url.replace('https://zf.ink/u/', '');
            $.ajax({
                type: 'GET',
                url: 'https://url.api.zf.ink/urls/' + id,
                data: {
                    url: url,
                },
                json: true,
                success: function (result) {
                    resultEl.html('结果：' + result.url);
                },
                error: function (result) {
                    resultEl.html('结果：' + result.url);
                }
            })
        }
    });
});