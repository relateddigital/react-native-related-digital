import React from 'react';
//import { SectionList, View, Text } from 'react-native';
import { Box, FlatList, Heading, HStack, VStack, Avatar, Text, Spacer, } from 'native-base';
const AnalyticsScreen = () => {
    const data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            fullName: 'Aafreen Khan',
            timeStamp: '12:47 PM',
            recentText: 'Good Day!',
            avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            fullName: 'Sujitha Mathur',
            timeStamp: '11:11 PM',
            recentText: 'Cheer up, there!',
            avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            fullName: 'Anci Barroco',
            timeStamp: '6:22 PM',
            recentText: 'Good Day!',
            avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
        },
        {
            id: '68694a0f-3da1-431f-bd56-142371e29d72',
            fullName: 'Aniket Kumar',
            timeStamp: '8:56 PM',
            recentText: 'All the best',
            avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
        },
        {
            id: '28694a0f-3da1-471f-bd96-142456e29d72',
            fullName: 'Kiara',
            timeStamp: '12:47 PM',
            recentText: 'I will call today.',
            avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
        },
    ];
    return (React.createElement(Box, null,
        React.createElement(Heading, { fontSize: "xl", p: "4", pb: "3" }, "Inbox"),
        React.createElement(FlatList, { data: data, renderItem: ({ item }) => (React.createElement(Box, { borderBottomWidth: "1", _dark: {
                    borderColor: 'muted.50',
                }, borderColor: "muted.800", pl: ['0', '4'], pr: ['0', '5'], py: "2" },
                React.createElement(HStack, { space: [2, 3], justifyContent: "space-between" },
                    React.createElement(Avatar, { size: "48px", source: {
                            uri: item.avatarUrl,
                        } }),
                    React.createElement(VStack, null,
                        React.createElement(Text, { _dark: {
                                color: 'warmGray.50',
                            }, color: "coolGray.800", bold: true }, item.fullName),
                        React.createElement(Text, { color: "coolGray.600", _dark: {
                                color: 'warmGray.200',
                            } }, item.recentText)),
                    React.createElement(Spacer, null),
                    React.createElement(Text, { fontSize: "xs", _dark: {
                            color: 'warmGray.50',
                        }, color: "coolGray.800", alignSelf: "flex-start" }, item.timeStamp)))), keyExtractor: (item) => item.id })));
};
export default AnalyticsScreen;
