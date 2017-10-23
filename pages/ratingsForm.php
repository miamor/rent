<form id="writeReview">
    <input type="hidden" name="node"/>
    <input type="hidden" class="rate-val" name="rate"/>
    <div class="form-group" style="margin-bottom:12px">
        <div class="col-md-3 no-padding"> </div>
        <div class="col-md-9 no-padding">
            <div class="star-info torate" data-id="">
                <span class="ui_star_rating star_0"></span>
                <div class="rating-icons left">
                    <div class="rating-star-icon v1" id="v1">&nbsp;</div>
                    <div class="rating-star-icon v2" id="v2">&nbsp;</div>
                    <div class="rating-star-icon v3" id="v3">&nbsp;</div>
                    <div class="rating-star-icon v4" id="v4">&nbsp;</div>
                    <div class="rating-star-icon v5" id="v5">&nbsp;</div>
                    <div class="rate-count" style="width:0%"></div>
                </div>
            </div>
            <div class="hide" id="ratingFlag">
                <em id="overallRatingFlagText"></em>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="col-md-3 no-padding">Tiêu đề </div>
        <div class="col-md-9 no-padding">
            <input type="text" class="form-control" name="r_title"/>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="col-md-3 no-padding">Nội dung </div>
        <div class="col-md-9 no-padding">
            <textarea class="form-control" name="r_content"></textarea>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="add-form-submit center">
        <input value="Làm lại" class="btn btn-default" type="reset">
        <input value="Gửi" class="btn btn-primary" type="submit">
    </div>
</form>
