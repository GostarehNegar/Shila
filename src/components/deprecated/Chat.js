var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Avatar, ConversationHeader, MessageList, ChatContainer, VoiceCallButton, InfoButton, MessageSeparator, Message, MessageInput, VideoCallButton, TypingIndicator, } from "@chatscope/chat-ui-kit-react";
import zoeIco from '../static/zoe.svg';
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat(props) {
        return _super.call(this, props) || this;
    }
    Chat.prototype.renderMessage = function (m) {
        return _jsx(Message, __assign({ model: {
                message: m.text,
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single"
            } }, { children: _jsx(Avatar, { src: zoeIco, name: "Zoe" }, void 0) }), m.id);
    };
    Chat.prototype.render = function () {
        var _this = this;
        var props = this.props;
        return _jsxs(ChatContainer, { children: [_jsxs(ConversationHeader, { children: [_jsx(ConversationHeader.Back, {}, void 0),
                        _jsx(Avatar, { src: zoeIco, name: "Zoe" }, void 0),
                        _jsx(ConversationHeader.Content, { userName: "Zoe", info: "Active 10 mins ago" }, void 0),
                        _jsxs(ConversationHeader.Actions, { children: [_jsx(VoiceCallButton, {}, void 0),
                                _jsx(VideoCallButton, {}, void 0),
                                _jsx(InfoButton, {}, void 0)] }, void 0)] }, void 0),
                _jsxs(MessageList, __assign({ typingIndicator: _jsx(TypingIndicator, { content: "Zoe is typing" }, void 0) }, { children: [_jsx(MessageSeparator, { content: "Saturday, 30 November 2019" }, void 0),
                        props.messages.map(function (m, i) { return _this.renderMessage(m); })] }), void 0),
                _jsx(MessageInput, { placeholder: "Type message here", value: "this.state.messageInputValue", onChange: function (val) { return _this.setMessageInputValue(val); }, onSend: function () { return _this.setMessageInputValue(""); } }, void 0)] }, void 0);
    };
    return Chat;
}(React.Component));
export { Chat };
export default Chat;
