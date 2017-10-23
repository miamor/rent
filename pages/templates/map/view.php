<form class="place-service col-md-3 no-padding">
    <div class="place-services-select">
        <div class="form-group">
            <label><input type="checkbox" class="minimal" checked><i class="fa fa-mortar-board"></i> Trường học</label>
        </div>
        <div class="form-group">
            <label><input type="checkbox" class="minimal"><i class="fa fa-cutlery"></i> Nhà hàng</label>
        </div>
        <div class="form-group">
            <label><input type="checkbox" class="minimal" checked><i class="fa fa-shopping-bag"></i> Địa điểm mua sắm</label>
        </div>
        <div class="form-group">
            <label><input type="checkbox" class="minimal" checked><i class="fa fa-soccer-ball-o"></i> Thể thao, giải trí</label>
        </div>
        <div class="form-group">
            <label><input type="checkbox" class="minimal" checked><i class="fa fa-hospital-o"></i> Cơ sở y tế</label>
        </div>
    </div>

    <div class="place-service-filter">
        <div class="form-group col-md-8 no-padding-right">
            <div class="col-md-5 control-label no-padding">Bán kính</div>
            <div class="col-md-7 no-padding-right">
                <input class="form-control" type="number" min="100" value="1000" id="circle_radius"/>
            </div>
        </div>
        <div class="btns col-md-4 right">
            <input class="right" type="submit" value="Filter"/>
        </div>
    </div>
</form>

<div id="place_map"></div>


<ul class="place-nav">
    <li class="place-nav-place_map"><a href="#place_map"><i class="fa fa-map"></i> Xem trên bản đồ</a></li>
    <li class="place-nav-info active"><a href="#info"><i class="fa fa-exclamation-circle"></i> Thông tin chi tiết</a></li>
    <li class="place-nav-reviews"><a href="#reviews"><i class="fa fa-star"></i> Đánh giá của người dùng</a></li>
    <li class="place-nav-reviewWrite"><a href="#reviewWrite"><i class="fa fa-star-o"></i> Thêm đánh giá</a></li>
    <li class="place-nav-contact"><a href="#contact"><i class="fa fa-phone"></i> Liên hệ</a></li>
</ul>


<h2 class="place-title">Blah blah</h2>

<div class="place-info-1" id="info">
    <div class="place-more col-md-4">
        <div class="place-more-info">
            <div class="place-address"><i class="fa fa-map-marker"></i> <strong>Đường Võ Nguyên Giáp, TP Đà Nẵng, Việt Nam</strong></div>
            <div class="place-price"><i class="fa fa-dollar"></i> Giá: <strong>35tr/m2</strong></div>
            <div style="margin-top:10px"><i class="fa fa-bed"></i> Loại: <span class="map-item-info-type">L</span> <a class="type-help" href="#" title="Loại L là gì?"><i class="fa fa-question"></i></a></div>
            <div><i class="fa fa-circle-o"></i> Số phòng còn: <span class="map-item-info-room">1/2</span></div>
        </div>
        <div class="place-contact-info" id="contact">
            <h3>User</h3>
            <a href="#" id="contact_3" class="place-contact-info-phone btn btn-danger">Liên hệ</a>
        </div>
    </div>

    <div class="col-md-4 place-ratings">
        <div class="map-item-ratings">
            <div class="rating">
                <span id="overallRating">4.5</span>
                <div class="overallBubbleRating"><span class="ui_star_rating star_45"></span></div>
                <a class="seeAllReviews" href="#reviews"><span id="totalReviews">15</span> reviews</a>
            </div>
            <div class="clearfix"></div>
            <div class="map-item-ratings-sta">
                <ul class="ratings_chart">
                    <li class="chart_row clickable" data-idx="5" title="2 đánh giá - 13.33%">
                        <span class="row_label row_cell">Tuyệt vời</span>
                        <span class="row_bar row_cell">
                            <span class="bar"><span class="fill" style="width: 13.33%;"></span></span>
                        </span>
                        <span class="row_count row_cell">13.33%</span>
                    </li>
                    <li class="chart_row clickable" data-idx="4" title="2 đánh giá - 13.33%">
                        <span class="row_label row_cell">Tốt</span>
                        <span class="row_bar row_cell">
                            <span class="bar"><span class="fill" style="width: 13.33%;"></span></span>
                        </span>
                        <span class="row_count row_cell">13.33%</span>
                    </li>
                    <li class="chart_row clickable" data-idx="3" title="4 đánh giá - 26.67%">
                        <span class="row_label row_cell">Trung bình</span>
                        <span class="row_bar row_cell">
                            <span class="bar"><span class="fill" style="width: 26.67%;"></span></span>
                        </span>
                        <span class="row_count row_cell">26.67%</span>
                    </li>
                    <li class="chart_row clickable" data-idx="2s">
                        <span class="row_label row_cell">Không tốt</span>
                        <span class="row_bar row_cell">
                            <span class="bar"><span class="fill"></span></span>
                        </span>
                        <span class="row_count row_cell"></span>
                    </li>
                    <li class="chart_row clickable" data-idx="1" title="3 đánh giá - 20.00%">
                        <span class="row_label row_cell">Tệ</span>
                        <span class="row_bar row_cell">
                            <span class="bar"><span class="fill" style="width: 20%;"></span></span>
                        </span>
                        <span class="row_count row_cell">20.00%</span>
                    </li>
                </ul>
            </div>
            <div class="clearfix"></div>
            <div class="subtitle">Mọi người nói về</div>
            <div class="keywords">
                <div class="reviewKeyword">
                    <div class="ui_avatar small">
                        <img src="https://media-cdn.tripadvisor.com/media/photo-t/01/2e/70/63/avatar041.jpg" class="centeredImg">
                    </div>
                    <a href="#REVIEWS" data-keyword="room was clean">“room was clean”</a> <span class="keywordCount">(21 reviews)</span>
                </div>
                <div class="reviewKeyword">
                    <div class="ui_avatar small">
                        <img src="https://media-cdn.tripadvisor.com/media/photo-t/01/2e/70/9d/avatar068.jpg" class="centeredImg">
                    </div>
                    <a href="#REVIEWS" data-keyword="stayed here">“stayed here”</a> <span class="keywordCount">(21 reviews)</span>
                </div>
                <div class="reviewKeyword">
                    <div class="ui_avatar small">
                        <img src="https://media-cdn.tripadvisor.com/media/photo-t/0c/fa/45/04/jules-v.jpg" class="centeredImg">
                    </div>
                    <a href="#REVIEWS" data-keyword="dog park">“dog park”</a> <span class="keywordCount">(6 reviews)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="place-photos col-md-4">
        <img src="http://localhost/rent/data/images/h6.jpg" class="place-main-photo"/>
        <div class="place-more-photos">
            <img src="http://localhost/rent/data/images/h7.jpg" class="place-more-photo"/>
            <img src="http://localhost/rent/data/images/h8.jpg" class="place-more-photo"/>
            <img src="http://localhost/rent/data/images/h10.jpg" class="place-more-photo"/>
        </div>
    </div>

    <div class="clearfix"></div>
</div>

<div class="place-info-2 col-md-9">
    <div class="place-des">
        <h4 class="botline">Thông tin</h4>
        <div class="place-des-content">
        SAPHIA - Giá chỉ từ 34 triệu/m2 – MẶT TIỀN ĐƯỜNG VÕ NGUYÊN GIÁP - ĐỐI DIỆN SÒNG BÀI CROWNE PLAZA – TRUNG TÂM HỘI NGHỊ APEC - KẸP GIỮA 2 BÃI TẮM<br/><br/>

        + Condotel, khách sạn nghỉ dưỡng: 18 lô 22m x 60m 1320m2 xây cao tối đa 28 tầng.<br/><br/>

        + Liền kề 130 lô: * Mặt tiền đường 20m5: 7m x 20m độ cao tối đa 28m<br/><br/>

        * Mặt tiền đường 33m (Nguyễn Khắc Viện): 7m x 22,5m độ cao tối đa 28m<br/><br/>

        Giá: -  Đường 20.5m : 35tr/m2<br/><br/>

               - Đường 33m Nguyển Khắc Viện : 37tr/m2<br/><br/>

        SAPHIA nằm tại vị trí "ĐẮC ĐỊA - tọa Lộ quan Hải", bên cạnh dự án là quần thể kiến trúc nghỉ dưỡng hiện đại, chuẩn 4-5 sao, được ôm trọn bởi bãi biển Mỹ Khê thơ mộng và mặt tiền đường Võ Nguyên Giáp. Một bên được mệnh danh là 1 trong 10 bãi tắm đẹp nhất hành tinh, còn bên còn lại cũng không hề kém cạnh khi mỗi “Tấc đất là tấc vàng”- Saphia tựa như một siêu phẩm mới được hình thành trong lòng Đà Nẵng.
        </div>
    </div>

    <div class="place-reviews-list" id="reviews">
        <h4 class="botline">Đánh giá của người dùng (<span class="place-reviews-total">100</span>)</h4>
        <table id="place_reviews" class="table">
            <thead>
                <tr>
                    <th></th> <!-- avatar -->
                    <th></th> <!-- content -->
                </tr>
            </thead>
        </table>
    </div>

    <div class="place-write-review" id="reviewWrite">
        <h4 class="botline">Thêm đánh giá</h4>
        <?php include 'pages/ratingsForm.php' ?>
    </div>

</div>
<div class="col-md-3 place-advertise">
    <div class="adv"></div>
</div>
<div class="clearfix"></div>
