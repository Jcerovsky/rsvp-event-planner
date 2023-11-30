#!/usr/bin/perl

use strict;
use warnings;
use JSON;
use DBI;
use CGI;

my $query = CGI->new();
my $method = $query->request_method();

my $data_source_name = "DBI:MariaDB:database=event_planner;host=localhost";
my $database_handle;
eval {
    $database_handle = DBI->connect($data_source_name, 'root', 'Ciro1115!', {RaiseError => 1, AutoCommit => 1});
};
if ($@) {
    print encode_json({error => "Could not connect to database: $@" })
}
