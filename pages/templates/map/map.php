<style>body{position:fixed;width:100%;height:100%}.container{position:absolute;top:0;bottom:0;right:0;height:0;width:100%;padding:0;margin:0}footer{display:none}</style>

<div class="nav-tabs-custom map-side no-padding">
    <div class="map-side-toggle"></div>

    <form id="map-search-form">
        <div id="map-input" class="hidden">
            <input type="text" id="isShowUtil" name="isShowUtil" value="0"/>
            <input type="text" id="product" name="product"/>
            <input type="text" id="zoom" name="zoom" value=""/>
            <input type="text" id="center" name="center" value=""/>
            <input type="text" id="points" name="points"/>
            <input type="text" id="details" name="details"/>
        </div>

        <div class="form-group map-search-form">
            <div class="col-md-7 no-padding">
                <input class="form-control" type="text" id="location" name="location" placeholder="Nhập địa điểm (vd: Trường Đại học Kinh tế Quốc dân)"/>
                <input class="hidden" type="text" id="location_id" name="location_id"/>
                <input class="hidden" type="text" id="lat" name="lat"/>
                <input class="hidden" type="text" id="lng" name="lng"/>
            </div>
            <div class="col-md-3 no-padding">
                <select class="form-control" id="location_radius" name="location_radius">
                  <option value="200">200 m</option>
                  <option value="500" selected>500 m</option>
                  <option value="1000">1 km</option>
                  <option value="2000">2 km</option>
                  <option value="5000">5 km</option>
                </select>
            </div>
            <div class="col-md-2 no-padding">
                <input type="submit" class="filter-submit" value="Lọc"/>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="map-filters hide">
            <div class="form-group">
                    <select id="type" name="type" class="form-control">
                        <option value="CN">Loại phòng trọ/nhà trọ</option>
                        <option value="S">Phòng trọ</option>
                        <option value="L1">Nhà thuê nguyên căn</option>
                        <option value="L2">Thuê căn hộ</option>
                    </select>
            </div>

            <div class="form-group">
                    <select id="city" name="city" class="form-control">
                        <option value="CN">--Tỉnh/Thành phố--</option>
                        <option value="SG">Hồ Chí Minh</option>
                        <option value="HN">Hà Nội</option>
                        <option value="DDN">Đà Nẵng</option>
                        <option value="BD">Bình Dương</option>
                        <option value="DNA">Đồng Nai</option>
                        <option value="KH">Khánh Hòa</option>
                        <option value="HP">Hải Phòng</option>
                        <option value="LA">Long An</option>
                        <option value="QNA">Quảng Nam</option>
                        <option value="VT">Bà Rịa Vũng Tàu</option>
                        <option value="DDL">Đắk Lắk</option>
                        <option value="CT">Cần Thơ</option>
                        <option value="BTH">Bình Thuận  </option>
                        <option value="LDD">Lâm Đồng</option>
                        <option value="TTH">Thừa Thiên Huế</option>
                        <option value="KG">Kiên Giang</option>
                        <option value="BN">Bắc Ninh</option>
                        <option value="QNI">Quảng Ninh</option>
                        <option value="TH">Thanh Hóa</option>
                        <option value="NA">Nghệ An</option>
                        <option value="HD">Hải Dương</option>
                        <option value="GL">Gia Lai</option>
                        <option value="BP">Bình Phước</option>
                        <option value="HY">Hưng Yên</option>
                        <option value="BDD">Bình Định</option>
                        <option value="TG">Tiền Giang</option>
                        <option value="TB">Thái Bình</option>
                        <option value="BG">Bắc Giang</option>
                        <option value="HB">Hòa Bình</option>
                        <option value="AG">An Giang</option>
                        <option value="VP">Vĩnh Phúc</option>
                        <option value="TNI">Tây Ninh</option>
                        <option value="TN">Thái Nguyên</option>
                        <option value="LCA">Lào Cai</option>
                        <option value="NDD">Nam Định</option>
                        <option value="QNG">Quảng Ngãi</option>
                        <option value="BTR">Bến Tre</option>
                        <option value="DNO">Đắk Nông</option>
                        <option value="CM">Cà Mau</option>
                        <option value="VL">Vĩnh Long</option>
                        <option value="NB">Ninh Bình</option>
                        <option value="PT">Phú Thọ</option>
                        <option value="NT">Ninh Thuận</option>
                        <option value="PY">Phú Yên</option>
                        <option value="HNA">Hà Nam</option>
                        <option value="HT">Hà Tĩnh</option>
                        <option value="DDT">Đồng Tháp</option>
                        <option value="ST">Sóc Trăng</option>
                        <option value="KT">Kon Tum</option>
                        <option value="QB">Quảng Bình</option>
                        <option value="QT">Quảng Trị</option>
                        <option value="TV">Trà Vinh</option>
                        <option value="HGI">Hậu Giang</option>
                        <option value="SL">Sơn La</option>
                        <option value="BL">Bạc Liêu</option>
                        <option value="YB">Yên Bái</option>
                        <option value="TQ">Tuyên Quang</option>
                        <option value="DDB">Điện Biên</option>
                        <option value="LCH">Lai Châu</option>
                        <option value="LS">Lạng Sơn</option>
                        <option value="HG">Hà Giang</option>
                        <option value="BK">Bắc Kạn</option>
                        <option value="CB">Cao Bằng</option>
                    </select>
            </div>
            <div class="form-group">
                    <select id="district" name="district" class="form-control">
                        <option value="CN">--Quận/Huyện--</option>
                    </select>
            </div>

            <div class="form-group">
                    <select id="area" name="area" class="form-control">
                        <option value="CN">Diện tích</option>
                        <option value="1"><= 30 m2</option>
                        <option value="2">30 - 50 m2</option>
                        <option value="3">50 - 80 m2</option>
                        <option value="4">80 - 100 m2</option>
                        <option value="5">100 - 150 m2</option>
                        <option value="6">150 - 200 m2</option>
                        <option value="7">200 - 250 m2</option>
                        <option value="8">250 - 300 m2</option>
                        <option value="9">300 - 500 m2</option>
                        <option value="10">>= 500 m2</option>
                    </select>
            </div>

            <div class="form-group">
                    <select name="price" id="price" class="form-control">
                        <option value="CN">Khoảng giá</option>
                        <option value="1">< 1 triệu</option>
                        <option value="2">1 - 2 triệu</option>
                        <option value="3">2 - 5 triệu</option>
                        <option value="4">5 - 7 triệu</option>
                        <option value="5">7 - 10 triệu</option>
                        <option value="6">10 - 20 triệu</option>
                        <option value="7">20 - 30 triệu</option>
                        <option value="8">30 - 50 triệu</option>
                        <option value="9">50 - 100 triệu</option>
                        <option value="10">> 100 triệu</option>
                    </select>
            </div>

            <div class="txt-with-line center">
                <span class="txt generate-new-button">Tìm kiếm nâng cao <span class="fa fa-caret-down"></span></span>
            </div>

            <div class="form-group">
                    <select id="ward" name="ward" class="form-control">
                        <option value="CN">--Phường/Xã--</option>
                    </select>
            </div>
            <div class="form-group">
                    <select id="street" name="street" class="form-control" placeholder="Đường">
                        <option value="CN">--Đường/Phố--</option>
                    </select>
            </div>

            <div class="form-group">
                    <select id="direction" name="direction" class="form-control">
                        <option value="CN">hướng</option>
                        <option value="e">Đông</option>
                        <option value="en">Đông Bắc</option>
                        <option value="es">Đông Nam</option>
                        <option value="w">Tây</option>
                        <option value="wn">Tây Bắc</option>
                        <option value="ws">Tây Nam</option>
                    </select>
            </div>
        </div>

    </form>


    <div id="map_results"></div>


    <div class="map-item-info-board"><div class="map-item-info-board-close"><i class="fa fa-times"></i></div><div id="iw-container">
        <div class="map-item-info-thumb-div hidden">
            <img class="map-item-info-thumb" src=""/>
            <div class="map-item-info-price center">
                <i class="fa fa-dollar"></i><span></span>
            </div>
        </div>
        <div class="iw-content map-item-info-details">
            <h4 class="map-item-info-title iw-title">Place title</h4>
            <div class="iw-subTitle"><i class="fa fa-map-marker"></i> <span class="map-item-info-address"></span></div>

            <div class="map-item-col">
                <div class="ui_reviews map-side-left">
                    <div class="map-item-ratings">
                        <div class="rating">
                            <span id="overallRating">4.0 </span>
                            <div class="overallBubbleRating"><span class="ui_star_rating"></span></div>
                            <a class="seeAllReviews" href="#reviews"><span id="totalReviews"></span> reviews</a>
                        </div>
                        <div class="clearfix"></div>
                        <div class="map-item-ratings-sta">
                            <ul class="ratings_chart">
                                <li class="chart_row clickable" data-idx="5">
                                    <span class="row_label row_cell">Tuyệt vời</span>
                                    <span class="row_bar row_cell">
                                        <span class="bar"><span class="fill"></span></span>
                                    </span>
                                    <span class="row_count row_cell"></span>
                                </li>
                                <li class="chart_row clickable" data-idx="4">
                                    <span class="row_label row_cell">Tốt</span>
                                    <span class="row_bar row_cell">
                                        <span class="bar"><span class="fill"></span></span>
                                    </span>
                                    <span class="row_count row_cell"></span>
                                </li>
                                <li class="chart_row clickable" data-idx="3">
                                    <span class="row_label row_cell">Trung bình</span>
                                    <span class="row_bar row_cell">
                                        <span class="bar"><span class="fill"></span></span>
                                    </span>
                                    <span class="row_count row_cell"></span>
                                </li>
                                <li class="chart_row clickable" data-idx="2s">
                                    <span class="row_label row_cell">Không tốt</span>
                                    <span class="row_bar row_cell">
                                        <span class="bar"><span class="fill"></span></span>
                                    </span>
                                    <span class="row_count row_cell"></span>
                                </li>
                                <li class="chart_row clickable" data-idx="1">
                                    <span class="row_label row_cell">Tệ</span>
                                    <span class="row_bar row_cell">
                                        <span class="bar"><span class="fill"></span></span>
                                    </span>
                                    <span class="row_count row_cell"></span>
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

                <div class="map-side-right">
                    <div class="map-item-reviews-list">
                    </div>

                    <div class="controls-utility" id="controlUtility">
                        <span class="utility-close"><i class="fa fa-times-circle"></i></span>
                        <div class="controls-utility-toggle hidden"><i class="fa fa-angle-double-right"></i></div>
                        <div class="utility-head">Các loại tiện ích
                            <select id="cbbRadius">
                              <option value="500">bán kính</option>
                              <option value="200">200 m</option>
                              <option value="500">500 m</option>
                              <option value="1000">1 km</option>
                              <option value="2000">2 km</option>
                              <option value="5000">5 km</option>
                              <option value="10000">10 km</option>
                            </select>
                        </div>
                        <div class="utility-body">
                            <label class="utility-type" for="chk1" title="Địa điểm ăn uống">
                                <input type="checkbox" id="chk1" value="1" checked="checked" />
                                Ăn uống
                            </label>
                            <label class="utility-type" for="chk2" title="Trung tâm thể thao, giải trí">
                                <input type="checkbox" checked="checked" id="chk2" value="2" />
                                Giải trí
                            </label>
                            <label class="utility-type" for="chk3" title="Địa điểm mua sắm">
                                <input type="checkbox" id="chk3" value="3" />
                                Mua sắm
                            </label>
                            <label class="utility-type" for="chk4" title="Bến xe, trạm xe">
                                <input type="checkbox" checked="checked" id="chk4" value="4" />
                                Bến xe
                            </label>
                            <label class="utility-type" for="chk5" title="Cơ sở y tế">
                                <input type="checkbox" checked="checked" id="chk5" value="5" />
                                Cơ sở y tế
                            </label>
                            <label class="utility-type" for="chk6" title="Trường học">
                                <input type="checkbox" checked="checked" id="chk6" value="6" />
                                Trường học
                            </label>
                            <label class="utility-type" for="chk7" title="Khách sạn">
                                <input type="checkbox" id="7" value="7" />
                                Khách sạn
                            </label>
                            <label class="utility-type" for="chk8" title="Địa điểm làm đẹp, spa">
                                <input type="checkbox" id="chk8" value="18" >
                                Làm đẹp
                            </label>
                            <label class="utility-type" for="chk9" title="ATM, ngân hàng">
                                <input type="checkbox" id="chk9" value="9" />
                                ATM, ngân hàng
                            </label>
                            <label class="utility-type" for="chk10" title="Tiện ích khác">
                                <input type="checkbox" id="chk10" value="10" />
                                Khác
                            </label>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>

            <div class="map-item-info-more">
                <div class="btn-group-vertical map-item-info-buttons">
                    <a class="btn btn-default map-item-view-utilities"><i class="fa fa-share-alt"></i> Tiện ích</a>
                    <a class="btn btn-default map-item-gotoview"><i class="fa fa-feed"></i> Chi tiết</a>
                </div>

                <div><i class="fa fa-bed"></i> Loại: <span class="map-item-info-type"></span> <a class="type-help" href="#"><i class="fa fa-question"></i></a></div>
                <div><i class="fa fa-circle-o"></i> Số phòng còn: <span class="map-item-info-room"></span></div>
                <div><i class="fa fa-phone"></i> Phone: <span class="map-item-info-contact_phone"></span></div>
            </div>

            <div class="no-padding-left hidden">
                <div class="map-item-info-des"></div>
                <div class="iw-bottom-gradient"></div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div></div>

</div>

<div id="map"></div>

<div class="btn-map-update-result hidden">
    <span>Click để cập nhật kết quả mới nhất</span>
</div>
<div class="controls-area hide" id="controlArea">
    <div class="begindraw">
        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/icon-pen.png" width="16" title="Khoanh vùng" />
        Vẽ để tìm
    </div>
    <div class="delshape">
        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/icon-delete.png" title="Xóa vùng đã khoanh" />
        Xóa
    </div>
    <div class="fullscreen hidden">
        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/full-screen.png" title="Mở rộng toàn màn hình" />
        Toàn màn hình
    </div>
    <div class="exitfullscreen hidden">
        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/exit-full-screen.png" title="Thoát chế độ rộng toàn màn hình" />
        Mặc định
    </div>
</div>
<div class="search-result-map">
    <div id="lblResultMessage"></div>
</div>


<div class="popup popup-dark hide"><div class="popup-inner"><div>
	<div class="popup-content hide">
		<a class="popup-btn" role="close"></a>
		<div class="the-board"></div>
	</div>
</div></div></div>


<div id="v-place-view" class="hidden"><div class="v-place-view">
    <div class="col-md-8 v-place-view-main">
        <div class="popup-section section-light v-place-main-info">
            <img class="v-place-avt left"/>
            <h4 class="v-place-title"></h4>
            <div class="v-place-type">Loại: <span class="v-place-type_txt"></span> <a class="type-help" href="#"><i class="fa fa-question"></i></a></div>
            <div class="clearfix"></div>
            <div class="col-md-8 no-padding">
                <div class="v-place-address"><i class="fa fa-map-marker"></i> <span class="v-place-adr"></span></div>
                <div class="v-place-room_left"><i class="fa fa-circle-o"></i> Số phòng còn: <span class="v-place-room_left_num"></span></div>
                <div class="v-place-price"><i class="fa fa-dollar"></i> Giá: <span class="v-place-pricenum"></span></div>
            </div>
            <div class="col-md-4 no-padding right">
                <div class="place-contact-info"></div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="popup-section v-place-thumbs-section">
            <div class="v-place-board v-place-v-thumbs">
                <div class="v-place-bg"></div>
                <div class="v-place-thumbs"></div>
            </div>
            <div class="v-place-switch-buttons">
                <div class="v-place-mode active" id="v-thumbs" title="Xem ảnh thường"><i class="fa fa-picture-o"></i></div>
                <div class="v-place-mode" id="v-360" title="Ảnh 360"><i class="fa fa-map"></i></div>
                <div class="v-place-mode" id="v-streetview" title="Ảnh đường phố"><i class="fa fa-map-signs"></i></div>
                <div class="v-place-mode" id="v-video" title="Xem video"><i class="fa fa-play-circle"></i></div>
            </div>
        </div>

        <div id="reviews" class="section-light v-place-reviews box box-primary">
            <h4 class="box-header v-place-reviews-header with-border">Đánh giá</h4>
            <div class="box-body no-padding v-place-reviews-list"></div>
        </div>

        <div class="clearfix"></div>
    </div>

    <div class="col-md-4 v-place-view-more">
        <div class="popup-section section-light v-place-ratings"></div>
        <div class="popup-section section-light v-place-details">
            <div class="v-place-details"></div>
        </div>
    </div>

    <div class="cleafix"></div>

</div>

    <div class="v-place-write-review col-md-12">
        <div class="col-md-1"></div>

        <div class="col-md-10">
            <div class="box box-primary">
                <h4 class="box-header with-border">Thêm đánh giá</h4>
                <div class="box-body">
                    <?php include 'pages/ratingsForm.php' ?>
                </div>
            </div>
        </div>

        <div class="col-md-1"></div>

        <div class="clearfix"></div>
    </div>

</div>
