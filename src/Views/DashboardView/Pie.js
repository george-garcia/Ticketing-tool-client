// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import {ResponsivePie} from '@nivo/pie'
import './Pie.css'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Pie = ({data  /* see data tab */}) => {

    return (
            <ResponsivePie data={data}
                           // colors={{ datum: 'data.color' }}
                           colors={{"scheme":"purpleRed_green"}}
                           margin={{top: 20, right: 80, bottom: 58, left: 80}}
                           innerRadius={0.6}
                           padAngle={0.5}
                           cornerRadius={5}
                           activeOuterRadiusOffset={8}
                           borderWidth={1}
                           borderColor={{
                               from: 'color',
                               modifiers: [
                                   [
                                       'darker',
                                       0.2
                                   ]
                               ]
                           }}
                           arcLinkLabelsSkipAngle={10}
                           arcLinkLabelsTextColor="#333333"
                           arcLinkLabelsThickness={2}
                           arcLinkLabelsColor={{from: 'color'}}
                           arcLabelsSkipAngle={10}
                           arcLabelsTextColor={{
                               from: 'color',
                               modifiers: [
                                   [
                                       'darker',
                                       2
                                   ]
                               ]
                           }}
                           legends={[
                               {
                                   anchor: 'bottom',
                                   direction: 'row',
                                   justify: false,
                                   translateX: 0,
                                   translateY: 56,
                                   itemsSpacing: 0,
                                   itemWidth: 100,
                                   itemHeight: 18,
                                   itemTextColor: '#333',
                                   itemDirection: 'left-to-right',
                                   itemOpacity: 1,
                                   symbolSize: 18,
                                   symbolShape: 'circle',
                                   effects: [
                                       {
                                           on: 'hover',
                                           style: {
                                               itemTextColor: '#000'
                                           }
                                       }
                                   ]
                               }
                           ]}
            />
    )
}

export default Pie;