<?php
  date_default_timezone_set('America/New_York');

  require_once("dbpass.php");
  # we isolate the db password to keep it out of source control.
  # dbpass.php has only a simple class definition like so:
  # class dbpass {
  #   public $password = "xxxx";
  # }

  class database extends dbpass {
    public $host = "localhost";
    public $username = "root";
    public $port = 3306;
    public $db_name = "fp";
  }

	function getConnection() {
		$db = new database;
		$dbhost = $db->host;
		$dbport = $db->port;
		$dbuser = $db->username;
		$dbpass = $db->password;
		$dbname = $db->db_name;
		$dbh = new PDO("mysql:host=$dbhost;port=$dbport;dbname=$dbname", $dbuser, $dbpass);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}
?>
