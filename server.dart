import 'dart:io';

import 'package:json_api/document.dart';
import 'package:json_api/http.dart';
import 'package:json_api/server.dart';

void main() async {
  final port = 8080;

  final address = '192.168.1.80';

  final repo = InMemoryRepository({'contacts': {}});
  await repo.create('contacts',
      Resource('contacts', '1', attributes: {'name': 'Trung'}));
  await repo.create(
      'contacts', Resource('contacts', '2', attributes: {'name': 'Thao'}));

  final controller = RepositoryController(repo);

  final jsonApiServer = JsonApiServer(controller);

  final loggingJsonApiServer = LoggingHttpHandler(jsonApiServer,
      onRequest: (r) => print('${r.method} ${r.uri}'),
      onResponse: (r) => print('${r.statusCode}'));

  final serverHandler = DartServer(loggingJsonApiServer);

  final server = await HttpServer.bind(address, port);
  print('Listening on ${Uri(host: address, port: port, scheme: 'http')}');

  await server.forEach(serverHandler);
}
