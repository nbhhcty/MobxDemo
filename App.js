import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

/*
* 引入这个两个头文件
* */
import {observable, action, autorun} from 'mobx';
import {observer} from 'mobx-react/native';

/*
* 添加@observer 字段监控 MobxTextOne 组件，当数据改变的时候更新界面
* */
@observer
export default class App extends Component<Props> {

    constructor() {
        super();

        // autorun内如果引用到被 @observable 修饰的变量，则会自动执行，方便监听打印日志log
        autorun(() => {
            console.log('this.count =' + this.count)
        })
    }

    /*
    * 使用@observable 监控数据源
    * */
    @observable
    count = 0;

    /*
    * 让count加1
    * */
    @action
    add = () => {
        this.count += 1;
    };

    /*
    * 当count大于0的时候，让count减1
    * */
    @action
    dec = () => {
        this.count > 0 && (this.count -= 1);
    };

    render(){
        return (
            <View style={styles.container}>
                <Text>{this.count}</Text>
                <Text style={styles.btn} onPress={this.add}> +</Text>
                <Text style={styles.btn} onPress={this.dec}> -</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btn: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'blue',
        color: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        textAlign:'center',
        padding:20,
    }
});
