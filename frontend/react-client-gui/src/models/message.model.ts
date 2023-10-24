export interface MessageModel {
	_id: string;
	sender_id: string;
	sender_first_name: string;
	sender_last_name: string;
	sender_username: string;
	sent_message: string;
	time_sent: Date;
}
