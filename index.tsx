/*
 * @Author: momokara
 * @description: 顶部轮播器
 * @Date: 2020-01-04 11:35:42
 * @LastEditTime: 2020-02-15 11:55:20
 */
import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components';

import './index.scss';
import { AtIcon } from 'taro-ui';

type compProps = {
	// 轮播配置
	config: swiperConfig;
	data: Array<swiperItem>;
	isLoading?: boolean;
	handlerTapItem(parmas: eventParmas): void;
};

type compState = {
	// 默认配置
	defaultConfig: swiperConfig;
};
interface AdSwiper {
	props: compProps;
	state: compState;
}

// 理论上用大写字母开头的 组件表示自定义组件dom以与小写字母开头的原生dom 区分
class AdSwiper extends Component {
	static options = {
		addGlobalClass: true
	};
	// 初始化值
	public state: compState = {
		defaultConfig: {
			indicatorDots: false,
			indicatorColor: 'rgba(0, 0, 0, 0.3)',
			indicatorActiveColor: '#000',
			autoplay: true,
			interval: 5000,
			duration: 500,
			circular: true,
			displayMultipleItems: 1,
			vertical: false,
			previousMargin: '0px',
			nextMargin: '0px',
			imgHeight: '350rpx',
			isShowName: false,
			imgMode: 'aspectFill'
		}
	};

	public countImgHeight(height, isAddnameRow = false) {
		const tag = height.match(/[a-z|A-Z]+/gi)[0];
		let num: number = Number(height.match(/\d+/gi)[0]);
		if (tag === 'px') {
			num = num * 2;
		}
		return {
			boxHeight: `height:${Taro.pxTransform(isAddnameRow ? num + 40 : num)};`,
			imgHeight: `height:${Taro.pxTransform(num)};`
		};
	}

	/**
   * react 推崇函数式组件,计算应该在高级组件或者页面中完成
   */
	render() {
		let { data, config, isLoading } = this.props;
		const _useConfig = Object.assign({}, this.state.defaultConfig, config);

		let imgStyle = this.countImgHeight(_useConfig.imgHeight, _useConfig.isShowName);
		const swiperItemClass = `Swiper-item-contant ${_useConfig.displayMultipleItems &&
		_useConfig.displayMultipleItems > 1
			? 'Swiper-item-padding'
			: ''}`;
		// 图片列表
		let _swiperItems =
			data && data.length ? (
				data.map((e: swiperItem) => {
					return (
						<SwiperItem key={e.imgUrl}>
							<View
								className={swiperItemClass}
								onClick={(event) => this.props.handlerTapItem({ data: e, event })}
							>
								<Image
									className="Swiper-item-img"
									style={imgStyle.imgHeight}
									mode={e.imgMode || _useConfig.imgMode}
									src={e.imgUrl || ''}
								/>
								<View className="Swiper-item-name-row ta-c fsp12">{e.name}</View>
							</View>
						</SwiperItem>
					);
				})
			) : (
				<SwiperItem>
					<View className="nodata-swiper ta-c">
						{/* <AtIcon className="ani-rote-3s" value="loading-2" size="30px" color="#fff" /> */}
						<AtIcon value="alert-circle" size="30px" color="#fff" />
						<Text className="fc-fff ta-c fsp14"> 暂无数据</Text>
					</View>
				</SwiperItem>
			);

		let _Swiper = isLoading ? (
			<View className="nodata-swiper ta-c">
				<AtIcon className="ani-rote-3s" value="loading-2" size="30px" color="#fff" />
				<Text className="fc-fff ta-c fsp14"> 加载中</Text>
			</View>
		) : (
			<Swiper
				className="Swiper-comp-box"
				style={imgStyle.boxHeight}
				indicatorDots={_useConfig.indicatorDots}
				indicatorColor={_useConfig.indicatorColor}
				indicatorActiveColor={_useConfig.indicatorActiveColor}
				autoplay={_useConfig.autoplay}
				interval={_useConfig.interval}
				duration={_useConfig.duration}
				circular={_useConfig.circular}
				displayMultipleItems={_useConfig.displayMultipleItems}
				vertical={_useConfig.vertical}
				previousMargin={_useConfig.previousMargin}
				nextMargin={_useConfig.nextMargin}
			>
				{_swiperItems}
			</Swiper>
		);
		return <View className="Swiper-comp-contant">{_Swiper}</View>;
	}
}

// 导出类需要定义确定输入接口 和组件状态
export default AdSwiper as ComponentClass<compProps, compState>;
