-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 19, 2022 lúc 07:56 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `myblogproject`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `authme`
--

CREATE TABLE `authme` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `authme`
--

INSERT INTO `authme` (`id`, `username`, `password`, `name`) VALUES
(1, 'admin', '$2a$12$rrLeSGRahtUYk255SXPURuMqg3hdTXptfWcBi1k9CptdXI5rLFkiO', 'Nguyễn Lim Thái Hồ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blog`
--

CREATE TABLE `blog` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT '1970-01-01 12:00:00',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `blog`
--

INSERT INTO `blog` (`id`, `title`, `content`, `category`, `author`, `date`, `image`, `state`) VALUES
('nghe-telesales-–-nhung-dieu-co-the-ban-chua-biet', 'NGHỀ TELESALES – NHỮNG ĐIỀU CÓ THỂ BẠN CHƯA BIẾT', 'Telesales ý là sale qua telephone, là tên tây ngắn gọn của công việc chào bán hàng qua điện thoại. Đây thường được coi là nghề dành cho sinh viên và những bạn mới ra trường xin việc làm vì nó khá dễ xin, các công ty lớn nhỏ thường tuyển nhiều. Mô tả công việc: đi qua chương trình tập huấn, nắm sản phẩm, đọc script (kịch bản), nhận danh sách số điện thoại, ổn định tư thế xuống ghế và bắt đầu gọi. Gọi từ đầu đến cuối. Ai máy bận hoặc không nghe máy thì đánh dấu vàng (hoặc đỏ xanh gì đó), tí gọi lại. Nếu may mắn, bạn sẽ có cơ hội đi gặp những người đồng ý cho bạn cơ hội trình bày và tìm cách chốt một cuộc mua bán thành công. Nếu không may, bạn sẽ cứ ngồi lõm cả cái ghế ấy cả ngày, ngày nào cũng vậy, cứ thế gọi điện thoại.<br><br>\nMô tả công việc sơ sơ là như vậy, thế còn lương lậu thì sao? Thường thì các bạn sẽ có lương cứng vài triệu, chẳng thấm vào đâu, nếu bán được hàng mới có tiền, gọi là commission và đây là một % nhỏ trong tổng giá trị đơn hàng mà bạn bán được cho công ty. Dễ hiểu đúng không? Nhưng đây là điều có thể bạn chưa biết: Commission chỉ được tính từ điểm mà nó vượt qua lương cứng. Ví dụ lương cứng của bạn là 3 triệu đồng/tháng. Một gói sản phẩm mà bạn cần bán có giá 300,000 đồng và bạn ăn (tính xông xênh) là 10% giá trị gói ấy, tức là 30,000 đồng/sản phẩm là của bạn. Vậy thì 100 sản phẩm đầu tiên bạn bán được sẽ coi như là lương, vì 30 ngàn nhân lên 100 món mới được 3 triệu đồng. Bán từ sản phẩm thứ 101 trở đi thì thu nhập của bạn tháng ấy mới là 3 triệu đồng + commission. Nếu tháng ấy bạn bán được 101 món, thu nhập của bạn là 3 triệu lẻ 30 ngàn đồng. Nhưng nếu chỉ bán được 99 món, 3 triệu tròn là con số bạn nhận được chứ không hơn. Sau một thời gian làm nghề, hoặc là bạn sẽ “slay” (ý là nổi trội) cả cái phòng sale và lên làm Sales Manager, hoặc là bạn văng ra. Hoặc cũng có thể bạn cứ thế ráng và ráng và ráng với hiệu suất bán hàng tằng tằng, không quá tốt cũng không quá tệ.', 'Blog', 'Nguyễn Lim Thái Hồ', '2022-07-17 17:17:13', 'img/blog/image-1658052921747.jpg', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `authme`
--
ALTER TABLE `authme`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
