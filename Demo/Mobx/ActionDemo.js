import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import {observable, action, autorun, computed, reaction, when} from 'mobx'
import {observer} from 'mobx-react'


@observer
export default class ActionDemo extends Component {

    @observable text = 0

    constructor() {
        super();

        const addAutorun = autorun(()=>{
            console.log('autorun' + this.text);
        });

        // 第一个函数（追踪函数）需要返回用来追踪的数据 data。data 会被传入第二个函数（效果函数）。
        // 效果函数是不会被追踪的，你在这里可以随意的使用其它被追踪的变量。
        reaction(()=>this.text, data=>{ 
            console.log('reaction' + this.text);
        });

        // 第一个参数（追踪函数）需要返回一个布尔值。当返回值为 true，when 方法的
        // 第二个参数（效果函数）会执行。最棒的部分是 when 方法在执行之后会自动 dispose。
        // 所以没必要再去定义 disposer 函数同时人工触发它。
        when(()=>true, ()=>{
            console.log('when = ' + this.text);
        })
    }

    render() {
        return (
          <View style={{flex:1 ,flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                {this.text}
            </Text>

            <Button title='➕' onPress= {()=>{
                this.text = this.text+1
            }}>
                
            </Button>
          </View>
        );
    }
}
