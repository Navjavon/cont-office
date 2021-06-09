create table users
(
	ID INTEGER
	    constraint users_pk
		    primary key autoincrement,
	username TEXT not null,
	firstName TEXT not null,
	lastName TEXT,
	position TEXT not null,
	password TEXT not null,
	type INTEGER default 1,
	isDeleted INTEGER default 0
);

create unique index users_username_uindex
    on users (username);


create table authors
(
	id integer not null
		constraint authors_pk
			primary key autoincrement,
	name text not null,
	surname text,
	gender int default 1 not null,
	phone text,
	street text,
	home text,
	room text
);

create unique index authors_id_uindex
	on authors (id);


create table groups
(
	id integer not null
		constraint groups_pk
			primary key autoincrement,
	type int not null,
	name text not null,
	parent int,
	isActive int default 1 not null,
	isDeleted int default 0 not null
);

create unique index groups_id_uindex
	on groups (id);


create table department
(
	id integer not null
		constraint department_pk
			primary key autoincrement,
	name text not null,
	parent int,
	isActive int default 1 not null
);

create unique index department_id_uindex
	on department (id);


create table execution
(
	id integer not null
		constraint execution_pk
			primary key autoincrement,
	resDepartmentId integer not null
		constraint execution_department_id_fk
			references department
				on delete set null,
	date integer not null,
	canalComments text,
	otherComments text
);

create unique index execution_id_uindex
	on execution (id);


create table regions
(
	id integer not null
		constraint regions_pk
			primary key autoincrement,
	name text not null,
	code int,
	isActive int default 1 not null,
	isDeleted int default 0 not null
);

create unique index regions_id_uindex
	on regions (id);



create table status
(
	id integer not null
		constraint status_pk
			primary key autoincrement,
	name text not null,
	isActive int default 1 not null
);

create unique index status_id_uindex
	on status (id);



create table complaints
(
	id integer not null
		constraint complaints_pk
			primary key autoincrement,
	number integer not null,
	description text not null,
	groupId integer not null
		constraint complaints_groups_id_fk
			references groups,
	complainerId integer not null
		constraint complaints_authors_id_fk
			references authors,
	executionId integer not null
		constraint complaints_execution_id_fk
			references execution,
	creatorId integer not null,
	removerId integer,
	remReasonId integer,
	remReasonDesc text,
	regionId integer not null
		constraint complaints_regions_id_fk
			references regions,
	creationDate integer not null,
	removeDate integer,
	isDeleted int default 0 not null,
	statusId integer default 1 not null
		constraint complaints_status_id_fk
			references status,
	constraint complaints_users_ID_ID_fk
		foreign key (creatorId, removerId) references users (ID, ID)
);

create unique index complaints_id_uindex
	on complaints (id);


create table suggestions
(
	id integer not null
		constraint suggestions_pk
			primary key autoincrement,
	number int not null,
	description text not null,
	groupId integer not null
		constraint suggestion_groups_id_fk
			references groups,
	authorId integer not null
		constraint suggestions_authors_id_fk
			references authors,
	creatorId integer not null
		constraint suggestions_users_ID_fk
			references users,
	date integer not null,
	comments text,
	isDeleted int default 0 not null
);

create unique index suggestions_id_uindex
	on suggestions (id);

