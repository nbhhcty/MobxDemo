/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
* 参考网址：https://reactnative.cn/docs/0.51/modal.html
* */
// Modal是模态视图，它的作用是可以用来覆盖 React Native中根视图的原生视图
// animationType ([‘none’, ‘slide’, ‘fade’]) 这个animationType属性作用就是如何控制模态动画，有一下三个类型：
// none: 出现的时候不带动画效果
// fade: 带有淡入动画的效果
// slide: 从底部滑动出来的动画效果

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Modal,
    Picker,
    Switch,
    TouchableHighlight
} from 'react-native';
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react'


const instructions = Platform.select({
    ios: 'ios',
    android: 'android'
});

@observer
class Button extends Component {

    @observable
    color='#000'

    @action
    _onHighlight = () => {
        color='#fff'
    };

    @action
    _onUnhighlight = () => {
        color='#000'
    };

    render() {
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[styles.buttonText, {color: this.color}]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
}

type Props = {};
@observer
export default class App extends Component<Props> {
    @observable
    animationType = 'none';
    @observable
    modalVisible = false;
    @observable
    transparent = false;

    @action
    _setModalVisible = (visible) => {
        this.modalVisible = visible
    };

    @action
    _setAnimationType = (type) => {
        this.animationType = type;
    };

    @action
    _toggleTransparent = () => {
        this.transparent = !this.transparent;
    };

    render() {
        var modalBackgroundStyle = {
            backgroundColor: this.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };
        return (
            <View>
                <Modal
                    animationType={this.animationType}
                    transparent={this.transparent}
                    visible={this.modalVisible}
                    onRequestClose={() => this._setModalVisible(false)}
                >
                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                            <Text>
                                This modal was presented {this.animationType === 'none' ? 'without' : 'with'} animation.
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={this._setModalVisible.bind(this, false)}
                                    style={styles.modalButton}>
                                    Close
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.row}>
                    <Button onPress={this._setAnimationType.bind(this, 'none')}
                            style={this.animationType === 'none' ? activeButtonStyle : {}}>
                        none
                    </Button>
                    <Button onPress={this._setAnimationType.bind(this, 'slide')}
                            style={this.animationType === 'slide' ? activeButtonStyle : {}}>
                        slide
                    </Button>
                    <Button onPress={this._setAnimationType.bind(this, 'fade')}
                            style={this.animationType === 'fade' ? activeButtonStyle : {}}>
                        fade
                    </Button>
                </View>
                <View style={{marginTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'grey', fontWeight: 'bold', marginRight: 20}}>Transparent</Text>
                    <Switch value={this.transparent} onValueChange={this._toggleTransparent}/>
                </View>

                <View style={{flexDirection:'row'}}>
                    <Button onPress={this._setModalVisible.bind(this, true)}>
                        Present
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop:64
    },
    rowTitle: {
        color:'red',
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
    pickerItem: {
        fontSize: 16,
    },
});
