function createGamepad() {
    var up = $('.ctrl31');
    up.attr('id', 'ctrl');
    up.html('<svg class="icon icon-arrow-up"><use class="icon0" xlink:href="#icon-arrow-up"></use></svg>');
    up.attr('style', 'cursor:pointer')

    var down = $('.ctrl33');
    down.attr('id', 'ctrl');
    down.html('<svg class="icon icon-arrow-down"><use class="icon1" xlink:href="#icon-arrow-down"></use></svg>');
    down.attr('style', 'cursor:pointer')

    var left = $('.ctrl22');
    left.attr('id', 'ctrl');
    left.html('<svg class="icon icon-arrow-left"><use class="icon2" xlink:href="#icon-arrow-left"></use></svg>');
    left.attr('style', 'cursor:pointer')

    var right = $('.ctrl42');
    right.attr('id', 'ctrl');
    right.html('<svg class="icon icon-arrow-right"><use class="icon3" xlink:href="#icon-arrow-right"></use></svg>');
    right.attr('style', 'cursor:pointer')

    var shoot = $('.ctrl72');
    shoot.attr('id', 'ctrl');
    shoot.html('<svg class="icon icon-rocket"><use class="icon4" xlink:href="#icon-rocket"></use></svg>');
    shoot.attr('style', 'cursor:pointer')

    input$.subscribe((x) => {
        switch (x.target) {
            case $('.icon-arrow-up')[0]: {
                action({
                    action: 'up',
                    type: x.type
                })
                break;
            }
            case $('.icon0')[0]: {
                action({
                    action: 'up',
                    type: x.type
                })
                break;
            }
            case $('.icon-arrow-down')[0]: {
                action({
                    action: 'down',
                    type: x.type
                })
                break;
            }
            case $('.icon1')[0]: {
                action({
                    action: 'down',
                    type: x.type
                })
                break;
            }
            case $('.icon-arrow-left')[0]: {
                action({
                    action: 'left',
                    type: x.type
                })
                break;
            }
            case $('.icon2')[0]: {
                action({
                    action: 'left',
                    type: x.type
                })
                break;
            }
            case $('.icon-arrow-right')[0]: {
                action({
                    action: 'right',
                    type: x.type
                })
                break;
            }
            case $('.icon3')[0]: {
                action({
                    action: 'right',
                    type: x.type
                })
                break;
            }
            case $('.icon-rocket')[0]: {
                action({
                    action: 'shoot',
                    type: x.type
                })
                break;
            }
            case $('.icon4')[0]: {
                action({
                    action: 'shoot',
                    type: x.type
                })
                break;
            }
        }
    })
}