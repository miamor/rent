<style>body{position:fixed;width:100%;height:100%}.container{position:absolute;top:0;bottom:0;right:0;height:0;width:100%;padding:0;margin:0}</style>

<div class="nav-tabs-custom map-side no-padding">
    <div class="map-side-toggle"></div>
    <ul class="nav nav-tabs">
        <li class="active"><a href="#map_search" data-toggle="tab">Search</a></li>
        <li><a href="#map_results" data-toggle="tab">Results</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="map_search">
            <form id="map-search-form">
                <div class="btn-map-update-result hidden">
                    <span>Click để cập nhật kết quả mới nhất</span>
                </div>
                <div class="controls-area hide" id="controlArea">
                    <span class="begindraw">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/icon-pen.png" width="16" title="Khoanh vùng" />
                        Vẽ để tìm
                    </span>
                    <span class="delshape">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/icon-delete.png" title="Xóa vùng đã khoanh" />
                        Xóa
                    </span>
                    <span class="fullscreen hidden">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/full-screen.png" title="Mở rộng toàn màn hình" />
                        Toàn màn hình
                    </span>
                    <span class="exitfullscreen hidden">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/exit-full-screen.png" title="Thoát chế độ rộng toàn màn hình" />
                        Mặc định
                    </span>
                </div>

                <div id="map-input" class="hidden">
                    <input type="text" id="isShowUtil" name="isShowUtil" value="0"/>
                    <input type="text" id="product" name="product"/>
                    <input type="text" id="zoom" name="zoom" value=""/>
                    <input type="text" id="center" name="center" value=""/>
                    <input type="text" id="points" name="points"/>
                    <input type="text" id="details" name="details"/>
                </div>
                <div class="search-result-map">
                    <div id="lblResultMessage"></div>
                </div>

                <div class="form-group">
                    <div class="col-md-12 no-padding">
                        <input class="form-control" type="text" id="location" name="location" placeholder="Nhập địa điểm (vd: Trường Đại học Kinh tế Quốc dân)"/>
                    </div>
                    <div class="clearfix"></div>
                    <div class="control-label col-md-4 no-padding">
                        Trong vòng
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select class="form-control" id="location_radius" name="location_radius">
                          <option value="500">Chọn bán kính</option>
                          <option value="200">200 m</option>
                          <option value="500">500 m</option>
                          <option value="1000">1 km</option>
                          <option value="2000">2 km</option>
                          <option value="5000">5 km</option>
                          <option value="10000">10 km</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Loại BĐS
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="type" name="type" class="form-control">
                            <option value="CN">Chọn loại bất động sản</option>
                            <option value="chungcu">Chung cư</option>
                            <optgroup label="Nhà bán">
                                <option value="nharieng">Nhà riêng</option>
                                <option value="bietthu">Biệt thự, liền kề</option>
                                <option value="matpho">Nhà mặt phố</option>
                            </optgroup>
                            <optgroup label="Đất bán">
                                <option value="datnen">Đất nền dự án</option>
                                <option value="bandat">Bán đất</option>
                            </optgroup>
                            <option value="resort">Trang trại, khu nghỉ dưỡng</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Thành phố
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="city" name="city" class="form-control">
                            <option value="CN">--Chọn Tỉnh/Thành phố--</option>
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
                    <div class="clearfix"></div>
                </div>
                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Quận/Huyện
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="district" name="district" class="form-control">
                            <option value="CN">--Chọn Quận/Huyện--</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Diện tích
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="area" name="area" class="form-control">
                            <option value="CN">Chưa xác định</option>
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
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <!--<input id="price" type="text" name="price" value="1000;100000" data-type="double" data-step="1000" data-postfix=" &euro;" data-from="30000" data-to="90000" data-hasgrid="true"> -->
                    <div class="control-label col-md-4 no-padding">
                        Giá tiền
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select name="price" id="price" class="form-control">
                            <option value="CN">Thoả thuận</option>
                            <option value="1">< 500 triệu</option>
                            <option value="2">500 - 800 triệu</option>
                            <option value="3">800 triệu - 1 tỷ</option>
                            <option value="4">1 - 2 tỷ</option>
                            <option value="5">2 - 3 tỷ</option>
                            <option value="6">3 - 5 tỷ</option>
                            <option value="7">5 - 7 tỷ</option>
                            <option value="8">7 - 10 tỷ</option>
                            <option value="9">10 - 20 tỷ</option>
                            <option value="10">20 - 30 tỷ</option>
                            <option value="11">> 30 tỷ</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="txt-with-line center">
                	<span class="txt generate-new-button">Tìm kiếm nâng cao <span class="fa fa-caret-down"></span></span>
            	</div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Xã/phường
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="ward" name="ward" class="form-control">
                            <option value="CN">--Chọn Phường/Xã--</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Đường
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="street" name="street" class="form-control" placeholder="Đường">
                            <option value="CN">--Chọn Đường/Phố--</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Hướng
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="direction" name="direction" class="form-control">
                            <option value="CN">Chọn hướng</option>
                            <option value="e">Đông</option>
                            <option value="en">Đông Bắc</option>
                            <option value="es">Đông Nam</option>
                            <option value="w">Tây</option>
                            <option value="wn">Tây Bắc</option>
                            <option value="ws">Tây Nam</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="add-form-submit form-one-button">
                    <input type="submit" value="Lọc"/>
                </div>
            </form>
        </div> <!-- /.tab-pane -->

        <div class="tab-pane" id="map_results">
        </div> <!-- /.tab-pane -->
    </div> <!-- /.tab-content -->
</div>

<div id="map"></div>

<div class="map-item-info-board hide"><div class="map-item-info-board-close"><i class="fa fa-times-circle"></i></div><div id="iw-container">
    <div class="map-item-info-thumb-div">
        <img class="map-item-info-thumb" src=""/>
        <div class="map-item-info-price center">
            <i class="fa fa-dollar"></i><span></span>
        </div>
        <div class="btn-group-vertical map-item-info-buttons">
            <a class=" map-item-view-utilities"><i class="fa fa-share-alt"></i> Tiện ich</a>
            <a class=" map-item-gotoview"><i class="fa fa-feed"></i> Chi tiết</a>
        </div>
        <!--
        <div class="btn-group map-item-info-buttons">
            <a class="btn btn-danger btn-sm map-item-view-utilities" title="Tiện ich"><i class="fa fa-share-alt"></i></a>
            <a class="btn btn-danger btn-sm map-item-gotoview" title="Chi tiết"><i class="fa fa-feed"></i></a>
        </div>
        -->
    </div>
    <div class="iw-content map-item-info-details">
        <h4 class="map-item-info-title iw-title">Place title</h4>
        <div class="iw-subTitle"><i class="fa fa-map-marker"></i> <span class="map-item-info-address"></span></div>
        <div class="map-item-info-more">
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

<div class="ui_reviews hide">
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

<div class="controls-utility hide" id="controlUtility">
    <div class="controls-utility-toggle"><i class="fa fa-angle-double-right"></i></div>
    <div class="utility-head">Các loại tiện ích
        <select id="cbbRadius">
          <option value="500">Chọn bán kính</option>
          <option value="200">200 m</option>
          <option value="500">500 m</option>
          <option value="1000">1 km</option>
          <option value="2000">2 km</option>
          <option value="5000">5 km</option>
          <option value="10000">10 km</option>
        </select>
    </div>
    <div class="utility-body">
        <label class="utility-type" for="chk4" title="Trường học">
            <input type="checkbox" class="minimal" checked="checked" id="chk4" value="4" />
            Trường học
        </label>
        <label class="utility-type" for="chk6" title="Bến xe, trạm xe">
            <input type="checkbox" class="minimal"  id="chk6" value="6" />
            Bến xe
        </label>
        <label class="utility-type" for="chk5" title="Cơ sở y tế">
            <input type="checkbox" class="minimal"  id="chk5" value="5" />
            Cơ sở y tế
        </label>
        <label class="utility-type" for="chk0" title="Địa điểm ăn uống">
            <input type="checkbox" class="minimal"  id="chk0" value="0" />
            Ăn uống
        </label>
        <label class="utility-type" for="chk8" title="Khách sạn">
            <input type="checkbox" class="minimal"  id="chk8" value="8" />
            Khách sạn
        </label>
        <label class="utility-type" for="chk2" title="Trung tâm thể thao, giải trí">
            <input type="checkbox" class="minimal" checked="checked" id="chk2" value="2" />
            Giải trí
        </label>
        <label class="utility-type" for="chk1" title="Địa điểm mua sắm">
            <input type="checkbox" class="minimal" checked="checked" id="chk1" value="1" />
            Mua sắm
        </label>
        <label class="utility-type" for="chk11" title="Địa điểm làm đẹp, spa">
            <input type="checkbox" class="minimal"  id="chk11" value="11" />
            Làm đẹp
        </label>
        <label class="utility-type" for="chk12" title="ATM, ngân hàng">
            <input type="checkbox" class="minimal"  id="chk12" value="12" />
            ATM, ngân hàng
        </label>
        <label class="utility-type" for="chk9" title="Tiện ích khác">
            <input type="checkbox" class="minimal"  id="chk9" value="9" />
            Khác
        </label>
        <span class="utility-close"><i class="fa fa-times-circle"></i></span>
    </div>
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
                                <div class="" id="ratingFlag">
                                    <em id="overallRatingFlagText">Excellent</em>
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
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-1"></div>

        <div class="clearfix"></div>
    </div>

</div>
