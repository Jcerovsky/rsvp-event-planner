#!/usr/bin/perl

use strict;
use warnings;
use JSON;
use DBI;
use CGI;

my $query = CGI->new();
my $method = $query->request_method();

print $query->header('application/json');

my $data_source_name = "DBI:MariaDB:database=event_planner;host=localhost";
my $database_handle;
eval {
    $database_handle = DBI->connect($data_source_name, 'root', 'Ciro1115!', {RaiseError => 1, AutoCommit => 1});
};
if ($@) {
    print encode_json({error => "Could not connect to database: $@" })
}

if ($method eq 'GET') {
   my $sth = $database_handle->prepare("SELECT * FROM rsvp_guests");
    $sth->execute();
    my @guests;
    while (my $row = $sth->fetchrow_hashref()) {
        push(@guests, $row)
    };
    print encode_json(\@guests)
};

if ($method eq "POST") {
    my $data = decode_json($query->param("POSTDATA"));
    my $first_name = $data->{'first_name'} ;
    my $last_name = $data->{'last_name'} ;
    my $attending = $data->{'attending'} eq 'TRUE'? 1: 0 ;
    my $number_of_attendees = $data->{'number_of_attendees'} ;
    my $dietary_requirements = $data->{'dietary_requirements'} ;
    my $special_requests = $data->{'special_requests'};
    my $sql = "INSERT INTO rsvp_guests (first_name, last_name, attending, number_of_attendees, dietary_requirements, special_requests) VALUES (?,?,?,?,?,?)";
    my $sth = $database_handle->prepare($sql);

    if ($sth->execute($first_name, $last_name, $attending, $number_of_attendees, $dietary_requirements, $special_requests)) {
        print(encode_json({success => 1, message => "Successfully saved data", status => 200}))
    } else {
        print(encode_json({error => "Could not save data: $DBI::errstr"}))
    }

}

