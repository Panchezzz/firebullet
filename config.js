module.exports = {

	// Host address for the server
	server_host: "0.0.0.0",

	// Server port (по умолчанию лучше оставить 3000 или 443, если с SSL)
	server_port: 3000,

	// SSL отключен
	ssl: false,
	ssl_key: "",		// отключено
	ssl_cert: "",		// отключено

	// Описание сервера
	server_name: "HecateServer",
	server_operator: "Hecate",
	server_motd: "Hecate is online!",

	// ICE (STUN/TURN) серверы
	ice_servers: [
		"stun:stun.l.google.com:19302",
		"stun:stun1.l.google.com:19302",
		"stun:stun2.l.google.com:19302",
		"stun:stun3.l.google.com:19302",
		"stun:stun4.l.google.com:19302",
		"stun:23.21.150.121",

		// {
		// //	"urls": "turn:18.225.6.244:3478",
		// //	"username": "root",
		// //	"credential": "root"
		// }
	],

	// Максимум подключений
	max_clients: 300,

	// Настройки ожидания (таймаутов)
	ping_frequency: 200000,
	client_timeout: 500000,
	inactive_timeout: 1200000,
	confirm_timeout: 35000,
	host_max_unconfirmed: 10,
	flood_limit: 1000,

	// Ограничения по длине названий
	max_alias_length: 20,
	max_name_length: 30,

	// Нет ограничения по пирами на игру
	max_game_peers: 0
};